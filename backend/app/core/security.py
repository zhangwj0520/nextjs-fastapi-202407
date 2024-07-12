from passlib.context import CryptContext
from prisma.models import User

import jwt
from typing import Literal, Any
from datetime import datetime, timedelta, timezone
from app.core.config import settings


# openssl rand -hex 32
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return pwd_context.hash(password)


async def authenticate_user(username: str, password: str) -> Literal[False] | User:
    user = await User.prisma().find_unique(
        where={
            "username": username,
        },
    )
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(
    subject: int | Any,
) -> str:
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": int(subject)}
    encoded_jwt = jwt.encode(to_encode, key=settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
