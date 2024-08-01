import 'server-only'
import type { ReactNode } from 'react'
import type { Runnable } from '@langchain/core/runnables'
import type { CompiledStateGraph } from '@langchain/langgraph'
import type { createStreamableValue } from 'ai/rsc'
import { createStreamableUI } from 'ai/rsc'
import type { StreamEvent } from '@langchain/core/tracers/log_stream'
import { AIProvider } from './client'

export const LAMBDA_STREAM_WRAPPER_NAME = 'lambda_stream_wrapper'

export type RunUICallbacks = Record<
  string,
  ReturnType<typeof createStreamableUI | typeof createStreamableValue>
>
export interface EventHandlerFields {
  ui: ReturnType<typeof createStreamableUI>
  callbacks: RunUICallbacks
}
export type EventHandler =
  | ((event: StreamEvent, fields: EventHandlerFields) => void)
  | ((event: StreamEvent, fields: EventHandlerFields) => Promise<void>)

/**
 * Executes `streamEvents` method on a runnable
 * and converts the generator to a RSC friendly stream
 *
 * @param runnable
 * @returns React node which can be sent to the client
 */
export function streamRunnableUI<RunInput, RunOutput>(
  runnable:
    | Runnable<RunInput, RunOutput>
    | CompiledStateGraph<RunInput, Partial<RunInput>>,
  inputs: RunInput,
  options: {
    eventHandlers: Array<EventHandler>
  },
) {
  const ui = createStreamableUI()
  const [lastEvent, resolve] = withResolvers<
    Array<any> | Record<string, any>
  >()
  let shouldRecordLastEvent = true;

  (async () => {
    let lastEventValue: StreamEvent | null = null
    const callbacks: RunUICallbacks = {}

    for await (const streamEvent of (
      runnable as Runnable<RunInput, RunOutput>
    ).streamEvents(inputs, {
      version: 'v1',
    })) {
      for await (const handler of options.eventHandlers) {
        await handler(streamEvent, {
          ui,
          callbacks,
        })
      }
      if (shouldRecordLastEvent) {
        lastEventValue = streamEvent
      }
      if (
        streamEvent.data.chunk?.name === 'LangGraph'
        && streamEvent.data.chunk?.event === 'on_chain_end'
      ) {
        shouldRecordLastEvent = false
      }
    }

    // resolve the promise, which will be sent
    // to the client thanks to RSC
    const resolveValue
      = lastEventValue?.data.output || lastEventValue?.data.chunk?.data?.output
    resolve(resolveValue)
    Object.values(callbacks).forEach(cb => cb.done())
    ui.done()
  })()

  return { ui: ui.value, lastEvent }
}

/**
 * Polyfill to emulate the upcoming Promise.withResolvers
 */
export function withResolvers<T>() {
  let resolve: (value: T) => void
  let reject: (reason?: any) => void

  const innerPromise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  // @ts-expect-error
  return [innerPromise, resolve, reject] as const
}

/**
 * Expose these endpoints outside for the client
 * We wrap the functions in order to properly resolve importing
 * client components.
 *
 * TODO: replace with createAI instead, even though that
 * implicitly handles state management
 *
 * See https://github.com/vercel/next.js/pull/59615
 * @param actions
 */
export function exposeEndpoints<T extends Record<string, unknown>>(
  actions: T,
): {
    (props: { children: ReactNode }): Promise<JSX.Element>
    $$types?: T
  } {
  return async function AI(props: { children: ReactNode }) {
    return <AIProvider actions={actions}>{props.children}</AIProvider>
  }
}
