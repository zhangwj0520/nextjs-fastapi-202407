from tkinter import N
from typing import Union, List, Literal

from pydantic import BaseModel

from prisma.models import User


# {'key': 'aaa/', 'hash': 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ', 'fsize': 0, 'mimeType': 'application/qiniu-object-manager', 'putTime': 17217232437785247, 'type': 0, 'status': 0, 'md5': 'd41d8cd98f00b204e9800998ecf8427e'}
class QiniuFileInfo(BaseModel):
    id: str
    type: Literal["file", "dir"]
    name: str
    path: str | None = None
    putTime: float
    fsize: float
    mimeType: str | None = None
    # belongTo: str | None


#   @ApiProperty({ description: '存入时间', type: Date })
#   putTime?: Date;

#   @ApiProperty({ description: '文件大小, byte单位' })
#   fsize?: string;

#   @ApiProperty({ description: '文件的mime-type' })
#   mimeType?: string;

#   @ApiProperty({ description: '所属目录' })
#   belongTo?: string;
