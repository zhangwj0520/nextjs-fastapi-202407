'use server'

import { generateObject, generateText, streamObject, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'
import { z } from 'zod'
import { sleep } from '@/lib/utils'

const openai = createOpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getText(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo-0125'),
    prompt: question,
  })

  return { text, finishReason, usage }
}

export async function generateStreamText(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      prompt: input,
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}

export async function getNotifications(input: string) {
  'use server'

  const { object: notifications } = await generateObject({
    model: openai('gpt-4-turbo'),
    system: 'You generate three notifications for a messages app.',
    prompt: input,
    schema: z.object({
      notifications: z.array(
        z.object({
          name: z.string().describe('Name of a fictional person.'),
          message: z.string().describe('Do not use emojis or links.'),
          minutesAgo: z.number(),
        }),
      ),
    }),
  })

  return { notifications }
}

export async function generateStreamObject(input: string) {
  'use server'

  const stream = createStreamableValue();

  (async () => {
    // const { partialObjectStream } = await streamObject({
    //   model: openai('gpt-4-turbo'),
    //   system: 'You generate 99 notifications for a messages app.',
    //   prompt: input,
    //   schema: z.object({
    //     notifications: z.array(
    //       z.object({
    //         name: z.string().describe('Name of a fictional person.'),
    //         message: z.string().describe('Do not use emojis or links.'),
    //         minutesAgo: z.number(),
    //       }),
    //     ),
    //   }),
    // })

    // for await (const partialObject of partialObjectStream) {
    //   stream.update(partialObject)
    // }

    for (let index = 0; index < 100; index++) {
      const json = {
        name: 'Cameron',
        message: 'How are you managing all this studying?',
        minutesAgo: index,
      }
      await sleep(100)
      console.log('json', json)
      stream.update({ data: json })
    }

    stream.done()
  })()

  return { object: stream.value }
}
