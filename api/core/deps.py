from fastapi import Depends, HTTPException, status, Security
from jwt.exceptions import InvalidTokenError
from typing import Annotated, Literal, Any
from datetime import datetime, timedelta, timezone
from api.models.base import TokenData
from prisma import Prisma
from prisma.models import User

from fastapi.security import SecurityScopes, OAuth2PasswordBearer
import jwt

from api.core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login-form")


# token
TokenDep = Annotated[str, Depends(oauth2_scheme)]


async def get_current_user(security_scopes: SecurityScopes, token: TokenDep) -> User:
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
        token_data = TokenData(user_id=user_id)
    except InvalidTokenError:
        raise credentials_exception

    user = await User.prisma().find_unique(
        where={
            "id": token_data.user_id,
        },
    )
    if user is None:
        raise credentials_exception

    return user


# 用户
CurrentUser = Annotated[User, Depends(get_current_user)]


async def get_current_active_user(
    current_user: User = Security(get_current_user, scopes=["me"]),
) -> User:
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="用户已被禁用")
    return current_user


async def get_db():
    db = Prisma(log_queries=True)
    try:
        await db.connect()
        yield db
    finally:
        await db.disconnect()


DB = Annotated[Prisma, Depends(get_db)]
