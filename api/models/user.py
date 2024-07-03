from prisma.models import User
from typing import Optional, List
from pydantic import BaseModel
from prisma.partials import UserWithoutRelations, PostWithoutRelations


class UsersList(BaseModel):
    list: List[User]
    total: int
