import sqlite3
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash


# ==========================================
# CONFIGURATION
# ==========================================

SECRET_KEY = "threatlens-development-secret-change-this"

ALGORITHM = "HS256"

TOKEN_EXPIRE_MINUTES = 60 * 24


# ==========================================
# PASSWORD HASHING
# ==========================================

password_hash = PasswordHash.recommended()


# ==========================================
# DATABASE
# ==========================================

DATABASE = "threatlens.db"


def get_connection():
    return sqlite3.connect(DATABASE)


def init_db():
    """
    Create the users table if it does not already exist.
    """

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


# ==========================================
# PASSWORD FUNCTIONS
# ==========================================

def hash_password(password: str) -> str:
    """
    Hash a plain-text password.
    """

    return password_hash.hash(password)


def verify_password(
    password: str,
    hashed_password: str
) -> bool:
    """
    Verify a password against its hash.
    """

    return password_hash.verify(
        password,
        hashed_password
    )


# ==========================================
# USER FUNCTIONS
# ==========================================

def create_user(
    name: str,
    email: str,
    password: str
):
    """
    Create a new user.
    """

    connection = get_connection()

    cursor = connection.cursor()

    hashed_password = hash_password(password)

    created_at = datetime.now(
        timezone.utc
    ).isoformat()

    try:

        cursor.execute(
            """
            INSERT INTO users (
                name,
                email,
                password,
                created_at
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                name,
                email.lower().strip(),
                hashed_password,
                created_at
            )
        )

        connection.commit()

        user_id = cursor.lastrowid

        return {
            "id": user_id,
            "name": name,
            "email": email.lower().strip()
        }

    except sqlite3.IntegrityError:

        return None

    finally:

        connection.close()


def get_user_by_email(email: str):
    """
    Retrieve a user by email.
    """

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            id,
            name,
            email,
            password,
            created_at
        FROM users
        WHERE email = ?
        """,
        (
            email.lower().strip(),
        )
    )

    row = cursor.fetchone()

    connection.close()

    if not row:
        return None

    return {
        "id": row[0],
        "name": row[1],
        "email": row[2],
        "password": row[3],
        "created_at": row[4]
    }


# ==========================================
# JWT
# ==========================================

def create_access_token(
    user_id: int,
    email: str
) -> str:
    """
    Create a JWT access token.
    """

    expires_at = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": expires_at
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def decode_access_token(
    token: str
):
    """
    Decode and validate a JWT token.
    """

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except jwt.ExpiredSignatureError:

        return None

    except jwt.InvalidTokenError:

        return None


# ==========================================
# INITIALIZE DATABASE
# ==========================================

init_db()