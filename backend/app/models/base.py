from typing import Union, List
from pydantic import BaseModel

from prisma.models import User


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User


class TokenData(BaseModel):
    user_id: int


class Message(BaseModel):
    message: str
