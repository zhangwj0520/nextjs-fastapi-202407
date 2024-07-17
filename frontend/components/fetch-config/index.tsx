import FetchClientConfig from './fetch-client'
import FetchServerConfig from './fetch-server'

export function FetchConfig() {
  return (
    <>
      <FetchServerConfig />
      <FetchClientConfig />
    </>
  )
}
