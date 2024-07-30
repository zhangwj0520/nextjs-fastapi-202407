import asyncio
import json

from prisma import Prisma
from pydantic import BaseModel
from faker import Faker
from prisma.models import Faker as FakerModel
from prisma.enums import FakerStatus
from prisma.types import FakerCreateInput

fake = Faker("zh_CN")


class FakerUser(BaseModel):
    id: str
    indexId: int
    firstName: str
    lastName: str
    age: int
    visits: int
    progress: int
    status: FakerStatus
    # subRows: list["FakerUser"] | None = None


def fake_data(len: int):
    """生成假数据

    Args:
        len (int): 长度
    """
    data_list = []
    for i in range(len):
        data_list.append(
            FakerUser(
                id=fake.pystr(min_chars=8, max_chars=8),
                indexId=i + 1,
                firstName=fake.last_name(),
                lastName=fake.first_name(),
                age=fake.random_int(min=18, max=60),
                visits=fake.random_int(min=1, max=1000),
                progress=fake.random_int(min=1, max=100),
                status=fake.random_element(["relationship", "complicated", "single"]),
            ).dict()
        )
    return data_list


async def main() -> None:
    db = Prisma(auto_register=True)
    await db.connect()

    list_data = fake_data(1000)
    await db.faker.create_many(data=list_data)

    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
