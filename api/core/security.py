from passlib.context import CryptContext
from prisma.models import User

import jwt
from typing import Annotated, Literal, Any
from datetime import datetime, timedelta, timezone
from api.models.base import TokenData

from fastapi.security import SecurityScopes, OAuth2PasswordBearer


# openssl rand -hex 32
SECRET_KEY = "2b4633e4ffd2b65911cd57863d575a19a703cb2aeae35d4e00aae544525c0eb7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
    data: dict,
) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)  # type: ignore
    return encoded_jwt
