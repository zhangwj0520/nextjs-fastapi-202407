from fastapi import APIRouter, Depends, HTTPException, Body, Query, Header, status
from pydantic import BaseModel

from typing import Union, Annotated


router = APIRouter()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


class User(BaseModel):
    username: str
    full_name: str | None = None


@router.get("")
def read_root():
    return {"Hello": "Worldnihao"}


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@router.post("/items")
async def create_item(item: Item):
    item_dict = item.model_dump()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict


# @router.put("/items/{item_id}")
# async def update_item(item_id: int, item: Item):

#     return {"item_id": item_id, **item.model_dump()}


@router.put("/items/{item_id}")
async def update_item12(item_id: int, item: Item, q: str | None = None):
    print("q", q)
    # 直接将item.model_dump()字典的键和值直接作为key-value参数传递
    result = {"item_id": item_id, **item.model_dump()}
    if q:
        result.update({"q": q})
    return result


@router.put("/items2/{item_id}")
async def update_item(
    item_id: int, item: Item, user: User, importance: Annotated[int, Body()]
):
    results = {
        "item_id": item_id,
        "item": item,
        "user": user,
    }
    return results


@router.get("/items3/query")
async def read_items(q: str | None = Query(default=None, max_length=4)):
    results: dict[str, Union[str, list[dict[str, str]]]] = {
        "items": [{"item_id": "Foo"}, {"item_id": "Bar"}]
    }
    if q:
        results.update({"q": q})
    return results


@router.get("/items3/default")
async def read_items2(q: str = Query(default=..., min_length=3)):
    results: dict[str, Union[str, list[dict[str, str]]]] = {
        "items": [{"item_id": "Foo"}, {"item_id": "Bar"}]
    }
    if q:
        results.update({"q": q})
    return results


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@router.get("/dep/")
async def read_items_dep(
    commons: dict[str, Union[str, int]] = Depends(common_parameters)
):
    return commons


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit


async def verify_token(x_token: str = Header()):
    print("x_token", x_token)
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=403, detail="X-Token header invalid")


# async def verify_key(x_key: str = Header()):
#     if x_key != "fake-super-secret-key":
#         raise HTTPException(status_code=400, detail="X-Key header invalid")
#     return x_key


@router.get("/dep2/", dependencies=[Depends(verify_token)])
async def read_items_dep22(commons: CommonQueryParams = Depends()):
    response: dict[str, Union[str, int, list[dict[str, str]]]] = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response
