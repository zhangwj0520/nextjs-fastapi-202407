from prisma.models import User
from typing import Optional, List
from pydantic import BaseModel
from prisma.partials import UserWihoutPassword, PostWithoutRelations


class UsersList(BaseModel):
    list: List[User]
    newSikp: int
    total: int
