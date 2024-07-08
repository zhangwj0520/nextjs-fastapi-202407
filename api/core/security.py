from passlib.context import CryptContext
from prisma.models import User
from fastapi import Depends, HTTPException, status, Security
from jwt.exceptions import InvalidTokenError
import jwt
from typing import Annotated, Literal, Any
from datetime import datetime, timedelta, timezone
from api.models.base import TokenData

from fastapi.security import SecurityScopes, OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login-form")

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


async def get_current_user(
    security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme)
) -> User:
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        print("token_scopes", token_scopes)
        token_data = TokenData(scopes=token_scopes, user_id=user_id)
    except InvalidTokenError:
        raise credentials_exception

    user = await User.prisma().find_unique(
        where={
            "id": token_data.user_id,
        },
    )
    if user is None:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


async def get_current_active_user(
    current_user: User = Security(get_current_user, scopes=["me"]),
) -> User:
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="用户已被禁用")
    return current_user
