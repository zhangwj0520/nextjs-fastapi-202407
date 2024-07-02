from fastapi import APIRouter, Depends, HTTPException, Body, Query
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
async def update_item(item_id: int, item: Item, q: str | None = None):
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
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results


@router.get("/items3/default")
async def read_items(q: str = Query(default=..., min_length=3)):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
