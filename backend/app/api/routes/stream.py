from fastapi import APIRouter, Depends, HTTPException
from regex import F
import requests

from fastapi import FastAPI, Response, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import json, uvicorn
from asyncio import sleep
import os
from pathlib import Path


router = APIRouter()


async def waypoints_generator():
    waypoints = [
        {"lat": 22.09769, "lng": 87.24068},
        {"lat": 22.09776, "lng": 87.24075},
        {"lat": 22.09784, "lng": 87.24082},
        {"lat": 22.09811, "lng": 87.24098},
    ]
    for waypoint in waypoints[0:10]:
        data = json.dumps(waypoint)
        print("data", data)
        # yield f"event: locationUpdate\ndata: {data}\n\n"
        yield f"data: {data}\n\n"
        await sleep(1)
    print(11111)
    yield b""


@router.get("")
async def root():
    return StreamingResponse(
        waypoints_generator(),
        media_type="text/event-stream",
        headers={"Content-Type": "text/event-stream"},
    )

    # return StreamingResponse(function_calling_demo(), media_type="text/event-stream")


@router.get("/tts")
async def getTTS(
    request: Request,
) -> StreamingResponse:
    request_range = request.headers.get("Range")
    # range = int(request_range[request_range.find("=") + 1 : request_range.find("-")])
    video_path = Path(__file__).parent / "../../assets/voideo"
    video_name = f"yunjian.mp3"
    file_name = f"{video_path}/{video_name}"
    file_size = os.path.getsize(file_name)
    # file_like = open(file_name, mode="rb")
    headers = {
        "Accept-Ranges": "bytes",
        "Content-Length": f"{file_size}",
        "Content-Type": "audio/mp3",
        "Content-Disposition": f"attachment;file_name={video_name}",
        # "Content-Range": f"{range + file_size - 1}",
    }

    def iterfile():  #
        with open(file_name, mode="rb") as file_like:  #
            yield from file_like  #

    # return StreamingResponse(iterfile(), media_type="audio/mp3")
    return StreamingResponse(iterfile(), headers=headers)


async def tongyi_generator():
    headers = {
        "accept": "text/event-stream",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-platform": "pc_tongyi",
        "x-xsrf-token": "1690a0c3-284d-4b8c-9f9f-9bb158c764c3",
        "cookie": "_ali_s_gray_t=60; _ali_s_gray_v=onesite,au,in,vn; t=e2e5f6d6db2436ad230df996418a3105; login_current_pk=1766898259082105; cna=hyP7HvCElAMCAWjHkzveL+W0; currentRegionId=cn-hangzhou; aliyun_choice=CN; yunpk=1766898259082105; tongyi_guest_ticket=8PVaG1cNXOE0U_EwFEZE3058cjfVapC0QW*qc0MZrvJ80U6u6RS53u2yQcQcUoDW8u8_y$Em5HQg0; tongyi_sso_ticket=MhJjTCi9sgu5VDp1WTYWTDBuvr6T4SgWzEaW_1Qx6qI0ytreMU*Ent6AHvLFvsF_0; cnaui=1766898259082105; aui=1766898259082105; _samesite_flag_=true; sca=71026a57; login_aliyunid_ticket=gdHq6sXXZQg4KFWufyvpeV*0*Cm58slMT1tJw3_s$$pYgjiKcpIuPNsAkBglnmmpGJfDw**i*_65vllqVs_eof_BNpwU_TOTNChZBoeM1KJexdfb9zhYnsN5Zos6qISCrRt7mGxbigG2Cd4fWaCmBZzI0; login_aliyunid_pk=1766898259082105; hssid=CN-SPLIT-ARCEByIOc2Vzc2lvbl90aWNrZXQyAQE47NzVgpIyQAFKEPcCjePeyEJm36zGqvf8xEh7cuxqFboVPFESnG_W5KMXc9Mmeg; hsite=6; aliyun_country=CN; partitioned_cookie_flag=doubleRemove; aliyun_site=CN; aliyun_lang=zh; login_aliyunid_csrf=_csrf_tk_1304422824355826; login_aliyunid=zhangwj****@hotmail.com; XSRF-TOKEN=ee019c60-ebad-44db-a8e0-d0f3c93019e1; atpsida=cc5a393efc3fb3bb742bc1cc_1722924969_10; tfstk=c0SOBOA2IJHOmNzhRsUHm2QyswnOawmWOROjDZ1N9KPxNYmm0sA1qgKhjV9DxKwd.; isg=BAkJdU94iwloTnc4LqmsdM5tGDNjVv2IH8xAFat_6_Av8ioE-aQmW4dgNFbEr5XA",
        "Referer": "https://tongyi.aliyun.com/qianwen",
        "Referrer-Policy": "no-referrer-when-downgrade",
    }

    playload = {
        "model": "",
        "action": "next",
        "mode": "chat",
        "userAction": "chat",
        "requestId": "a340939d929a40aa89fdaa04fc0cf347",
        "sessionId": "",
        "sessionType": "text_chat",
        "parentMsgId": "",
        "contents": [
            {
                "content": "你好",
                "contentType": "text",
                "role": "user",
            }
        ],
        "params": {
            "fileUploadBatchId": "d9b09b9dd563484f8477dcef37d51bbf",
            "agentId": "",
        },
    }
    response = requests.post(
        "https://qianwen.biz.aliyun.com/dialog/conversation",
        headers=headers,
        json=playload,
        stream=True,
    )
    # 确保请求成功
    response.raise_for_status()

    # 逐行读取响应
    for chunk in response.iter_content(1024):  # Adjust chunk size as needed
        decoded_line = chunk.decode("utf-8")
        print(decoded_line)
        yield f"{decoded_line}"


@router.get("/tongyi", response_model=bytes)
async def getTongyi(
    request: Request,
) -> StreamingResponse:

    return StreamingResponse(tongyi_generator(), media_type="text/event-stream")
