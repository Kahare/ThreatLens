from fastapi import FastAPI, HTTPException, Header
from auth import (
    create_user,
    get_user_by_email,
    verify_password,
    create_access_token,
    decode_access_token,
)
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

from scanner import run_scan
from scan_history import save_scan

app = FastAPI(
    title="ThreatLens API",
    description="ThreatLens vulnerability scanner API",
    version="1.0.0",
)


# Allow the React/Vite frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScanRequest(BaseModel):
    target: HttpUrl

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {
        "message": "ThreatLens API is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }

@app.post("/api/register")
def register(request: RegisterRequest):

    if not request.name.strip():
        raise HTTPException(
            status_code=400,
            detail="Name is required."
        )

    if not request.email.strip():
        raise HTTPException(
            status_code=400,
            detail="Email is required."
        )

    if len(request.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters."
        )

    user = create_user(
        name=request.name.strip(),
        email=request.email.strip(),
        password=request.password
    )

    if user is None:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists."
        )

    return {
        "message": "Account created successfully.",
        "user": user
    }

@app.post("/api/login")
def login(request: LoginRequest):

    user = get_user_by_email(
        request.email.strip()
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    password_valid = verify_password(
        request.password,
        user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    access_token = create_access_token(
        user_id=user["id"],
        email=user["email"]
    )

    return {
        "message": "Login successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }
def get_current_user(
    authorization: str | None = Header(default=None)
):
    """
    Extract and validate the JWT from the Authorization header.
    """

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authentication required."
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header."
        )

    token = authorization.split(
        " ",
        1
    )[1]

    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token."
        )

    return payload
@app.post("/api/scan")
def scan(
    request: ScanRequest,
    authorization: str | None = Header(default=None)
):
    current_user = get_current_user(
        authorization
    )

    try:

        result = run_scan(
            str(request.target)
        )

        if result is None:
            raise HTTPException(
                status_code=400,
                detail="Unable to scan the target."
            )

        user_id = int(
            current_user["sub"]
        )

        scan_id = save_scan(
            user_id=user_id,
            result=result
        )

        result["scan_id"] = scan_id

        return result

    except HTTPException:
        raise

    except Exception as error:

        print(
            f"[API ERROR] {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="An error occurred while scanning the target."
        )