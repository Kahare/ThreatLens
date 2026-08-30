import json
import sqlite3
from datetime import datetime, timezone


DATABASE = "threatlens.db"


def get_connection():
    return sqlite3.connect(DATABASE)


def init_scan_history():
    """
    Create the scan history table if it doesn't exist.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS scan_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            target TEXT NOT NULL,
            domain TEXT NOT NULL,
            risk_score INTEGER,
            risk_level TEXT,
            total_findings INTEGER,
            scan_time TEXT NOT NULL,
            result TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


def save_scan(
    user_id: int,
    result: dict
):
    """
    Save a completed scan for a user.
    """

    scan_information = result.get(
        "scan_information",
        {}
    )

    risk_summary = result.get(
        "risk_summary",
        {}
    )

    target = scan_information.get(
        "target",
        ""
    )

    domain = scan_information.get(
        "domain",
        ""
    )

    scan_time = scan_information.get(
        "scan_time"
    ) or datetime.now(
        timezone.utc
    ).isoformat()

    risk_score = risk_summary.get(
        "risk_score",
        0
    )

    risk_level = risk_summary.get(
        "risk_level",
        "Unknown"
    )

    total_findings = risk_summary.get(
        "total_findings",
        0
    )

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO scan_history (
            user_id,
            target,
            domain,
            risk_score,
            risk_level,
            total_findings,
            scan_time,
            result
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            user_id,
            target,
            domain,
            risk_score,
            risk_level,
            total_findings,
            scan_time,
            json.dumps(result)
        )
    )

    connection.commit()

    scan_id = cursor.lastrowid

    connection.close()

    return scan_id


def get_user_scans(
    user_id: int
):
    """
    Return all scans belonging to a user.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            id,
            target,
            domain,
            risk_score,
            risk_level,
            total_findings,
            scan_time
        FROM scan_history
        WHERE user_id = ?
        ORDER BY id DESC
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    connection.close()

    scans = []

    for row in rows:
        scans.append({
            "id": row[0],
            "target": row[1],
            "domain": row[2],
            "risk_score": row[3],
            "risk_level": row[4],
            "total_findings": row[5],
            "scan_time": row[6]
        })

    return scans


def get_scan(
    user_id: int,
    scan_id: int
):
    """
    Return a complete scan belonging to a user.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT result
        FROM scan_history
        WHERE id = ?
        AND user_id = ?
        """,
        (
            scan_id,
            user_id
        )
    )

    row = cursor.fetchone()

    connection.close()

    if not row:
        return None

    return json.loads(row[0])


init_scan_history()