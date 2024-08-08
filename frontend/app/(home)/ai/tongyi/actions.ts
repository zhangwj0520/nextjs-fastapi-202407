'use server'

import { generateObject, generateText, streamObject, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { createStreamableValue } from 'ai/rsc'
import { z } from 'zod'
import { sleep } from '@/lib/utils'

export async function generateStreamObject(input: string) {
  'use server'

  console.log(11111)
  const stream = createStreamableValue()
  let i = 1;

  (async () => {
    fetch('https://qianwen.biz.aliyun.com/dialog/conversation', {
      headers: {
        'accept': 'text/event-stream',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-platform': 'pc_tongyi',
        'x-xsrf-token': '1690a0c3-284d-4b8c-9f9f-9bb158c764c3',
        'cookie': '_ali_s_gray_t=60; _ali_s_gray_v=onesite,au,in,vn; t=e2e5f6d6db2436ad230df996418a3105; login_current_pk=1766898259082105; cna=hyP7HvCElAMCAWjHkzveL+W0; currentRegionId=cn-hangzhou; aliyun_choice=CN; yunpk=1766898259082105; tongyi_guest_ticket=8PVaG1cNXOE0U_EwFEZE3058cjfVapC0QW*qc0MZrvJ80U6u6RS53u2yQcQcUoDW8u8_y$Em5HQg0; tongyi_sso_ticket=MhJjTCi9sgu5VDp1WTYWTDBuvr6T4SgWzEaW_1Qx6qI0ytreMU*Ent6AHvLFvsF_0; cnaui=1766898259082105; aui=1766898259082105; _samesite_flag_=true; sca=71026a57; login_aliyunid_ticket=gdHq6sXXZQg4KFWufyvpeV*0*Cm58slMT1tJw3_s$$pYgjiKcpIuPNsAkBglnmmpGJfDw**i*_65vllqVs_eof_BNpwU_TOTNChZBoeM1KJexdfb9zhYnsN5Zos6qISCrRt7mGxbigG2Cd4fWaCmBZzI0; login_aliyunid_pk=1766898259082105; hssid=CN-SPLIT-ARCEByIOc2Vzc2lvbl90aWNrZXQyAQE47NzVgpIyQAFKEPcCjePeyEJm36zGqvf8xEh7cuxqFboVPFESnG_W5KMXc9Mmeg; hsite=6; aliyun_country=CN; partitioned_cookie_flag=doubleRemove; aliyun_site=CN; aliyun_lang=zh; login_aliyunid_csrf=_csrf_tk_1304422824355826; login_aliyunid=zhangwj****@hotmail.com; XSRF-TOKEN=ee019c60-ebad-44db-a8e0-d0f3c93019e1; atpsida=cc5a393efc3fb3bb742bc1cc_1722924969_10; tfstk=c0SOBOA2IJHOmNzhRsUHm2QyswnOawmWOROjDZ1N9KPxNYmm0sA1qgKhjV9DxKwd.; isg=BAkJdU94iwloTnc4LqmsdM5tGDNjVv2IH8xAFat_6_Av8ioE-aQmW4dgNFbEr5XA',
        'Referer': 'https://tongyi.aliyun.com/qianwen',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: '{"model":"","action":"next","mode":"chat","userAction":"chat","requestId":"a340939d929a40aa89fdaa04fc0cf347","sessionId":"","sessionType":"text_chat","parentMsgId":"","contents":[{"content":"写一段关于中国经济10000字的文章","contentType":"text","role":"user"}],"params":{"fileUploadBatchId":"d9b09b9dd563484f8477dcef37d51bbf","agentId":""}}',
      method: 'POST',
    }).then(res => res.body).then((rb) => {
      const reader = rb.getReader()
      const decoder = new TextDecoder()
      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log('done', done)
                controller.close()
                stream.done()
                return
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value)
              // Check chunks by logging to the console
              // console.log(done, value)
              i++
              const chunkValue = decoder.decode(value)
              stream.update({ data: { i } })
              console.log('chunkValue', chunkValue)
              push()
            })
          }
          push()
        },
      })
    })
  })()

  return { object: stream.value }
}

export async function getTongyi(input: string) {
  'use server'

  console.log(11111)
  const stream = createStreamableValue();

  (async () => {
    fetch('https://qianwen.biz.aliyun.com/dialog/conversation', {
      headers: {
        'accept': 'text/event-stream',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-platform': 'pc_tongyi',
        'x-xsrf-token': '1690a0c3-284d-4b8c-9f9f-9bb158c764c3',
        'cookie': '_ali_s_gray_t=60; _ali_s_gray_v=onesite,au,in,vn; t=e2e5f6d6db2436ad230df996418a3105; login_current_pk=1766898259082105; cna=hyP7HvCElAMCAWjHkzveL+W0; currentRegionId=cn-hangzhou; aliyun_choice=CN; yunpk=1766898259082105; tongyi_guest_ticket=8PVaG1cNXOE0U_EwFEZE3058cjfVapC0QW*qc0MZrvJ80U6u6RS53u2yQcQcUoDW8u8_y$Em5HQg0; tongyi_sso_ticket=MhJjTCi9sgu5VDp1WTYWTDBuvr6T4SgWzEaW_1Qx6qI0ytreMU*Ent6AHvLFvsF_0; cnaui=1766898259082105; aui=1766898259082105; _samesite_flag_=true; sca=71026a57; login_aliyunid_ticket=gdHq6sXXZQg4KFWufyvpeV*0*Cm58slMT1tJw3_s$$pYgjiKcpIuPNsAkBglnmmpGJfDw**i*_65vllqVs_eof_BNpwU_TOTNChZBoeM1KJexdfb9zhYnsN5Zos6qISCrRt7mGxbigG2Cd4fWaCmBZzI0; login_aliyunid_pk=1766898259082105; hssid=CN-SPLIT-ARCEByIOc2Vzc2lvbl90aWNrZXQyAQE47NzVgpIyQAFKEPcCjePeyEJm36zGqvf8xEh7cuxqFboVPFESnG_W5KMXc9Mmeg; hsite=6; aliyun_country=CN; partitioned_cookie_flag=doubleRemove; aliyun_site=CN; aliyun_lang=zh; login_aliyunid_csrf=_csrf_tk_1304422824355826; login_aliyunid=zhangwj****@hotmail.com; XSRF-TOKEN=ee019c60-ebad-44db-a8e0-d0f3c93019e1; atpsida=cc5a393efc3fb3bb742bc1cc_1722924969_10; tfstk=c0SOBOA2IJHOmNzhRsUHm2QyswnOawmWOROjDZ1N9KPxNYmm0sA1qgKhjV9DxKwd.; isg=BAkJdU94iwloTnc4LqmsdM5tGDNjVv2IH8xAFat_6_Av8ioE-aQmW4dgNFbEr5XA',
        'Referer': 'https://tongyi.aliyun.com/qianwen',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: '{"model":"","action":"next","mode":"chat","userAction":"chat","requestId":"a340939d929a40aa89fdaa04fc0cf347","sessionId":"","sessionType":"text_chat","parentMsgId":"","contents":[{"content":"写一段关于中国经济1000字的文章","contentType":"text","role":"user"}],"params":{"fileUploadBatchId":"d9b09b9dd563484f8477dcef37d51bbf","agentId":""}}',
      method: 'POST',
    }).then(res => res.body).then((rb) => {
      const reader = rb.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log('done', value)
                controller.close()
                stream.done()
                return
              }

              buffer += decoder.decode(value, { stream: true })
              let startIndex = buffer.indexOf('{"aiDisclaimer"')
              let endIndex = buffer.indexOf('data:', startIndex + 1) - 1

              while (startIndex !== -1 && endIndex !== -1) {
                const resultData = buffer.substring(startIndex, endIndex + 1)
                stream.update({ data: resultData })
                buffer = buffer.substring(endIndex + 1) // 移除已处理的数据
                // 寻找下一条消息的起始位置
                startIndex = buffer.indexOf('{"aiDisclaimer"')
                endIndex = buffer.indexOf('data:', startIndex) - 1
              }
              push()
            })
          }
          push()
        },
      })
    })
  })()

  console.log(2222)

  return { object: stream.value }
}
