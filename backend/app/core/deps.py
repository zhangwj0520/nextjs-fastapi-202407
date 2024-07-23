from fastapi import Depends, HTTPException, status, Security
from jwt.exceptions import InvalidTokenError
from typing import Annotated, Literal, Any
from datetime import datetime, timedelta, timezone
from app.core.config import settings
from app.models.base import TokenPayload
from prisma import Prisma
from prisma.models import User

from fastapi.security import SecurityScopes, OAuth2PasswordBearer
import jwt

from app.core.security import ALGORITHM

from qiniu import Auth, BucketManager


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# token
TokenDep = Annotated[str, Depends(oauth2_scheme)]

async def get_current_user(token: TokenDep) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = await User.prisma().find_unique(
        where={
            "id": token_data.sub,
        },
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"Authenticate": "Bearer"},
        )
    if user.disabled is not False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="用户被禁用"
        )

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


async def get_qiniu_auth() -> Auth:
    return Auth(settings.QINIU_ACCESS_KEY, settings.QINIU_SECRET_KEY)


QiniuAuth = Depends(get_qiniu_auth)


async def get_bucket_manager() -> BucketManager:
    q = Auth(settings.QINIU_ACCESS_KEY, settings.QINIU_SECRET_KEY)
    return BucketManager(q)


# 初始化BucketManager
QiniuBucket = Annotated[BucketManager, Depends(get_bucket_manager)]
