"""
Configuration settings for the Beginner Vulnerability Scanner.
"""

# ==========================================
# APPLICATION INFORMATION
# ==========================================

APP_NAME = "Beginner Vulnerability Scanner"
VERSION = "2.0.0"

USER_AGENT = f"{APP_NAME}/{VERSION}"


# ==========================================
# NETWORK SETTINGS
# ==========================================

REQUEST_TIMEOUT = 5
SOCKET_TIMEOUT = 1

DEFAULT_SSL_PORT = 443


# ==========================================
# PORT SCANNING
# ==========================================

COMMON_PORTS = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    3306: "MySQL"
}


# ==========================================
# SECURITY HEADERS
# ==========================================

SECURITY_HEADERS = {
    "Content-Security-Policy":
        "Helps reduce XSS and content injection attacks.",

    "Strict-Transport-Security":
        "Forces browsers to use HTTPS.",

    "X-Frame-Options":
        "Helps protect against clickjacking.",

    "X-Content-Type-Options":
        "Helps prevent MIME-type sniffing.",

    "Referrer-Policy":
        "Controls how much referrer information is shared."
}


# ==========================================
# RISK SCORING
# ==========================================

SEVERITY_SCORES = {
    "Informational": 0,
    "Low": 1,
    "Medium": 3,
    "High": 6,
    "Critical": 10
}


# ==========================================
# REPORTING
# ==========================================

REPORT_DIRECTORY = "reports"


# ==========================================
# ROBOTS.TXT
# ==========================================

SENSITIVE_PATH_KEYWORDS = [
    "admin",
    "backup",
    "private",
    "config",
    "database",
    "login",
    "secret",
    "internal"
]