'use client'

import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { Skeleton } from '../ui/skeleton'

export interface CurrentWeatherProps {
  temperature: number
  city: string
  province: string
  weather: string
  reporttime: string
}

export function CurrentWeatherLoading(): JSX.Element {
  return (
    <Card className="w-[325px] max-w-[325px] p-4 h-[300px] max-h-[300px] flex flex-col text-gray-50 bg-black">
      <div className="flex justify-between items-center mb-1">
        <Skeleton className="h-[16px] w-[100px]" />
        <Skeleton className="h-[16px] w-[75px]" />
      </div>
      <div className="text-left mb-4">
        <Skeleton className="h-[16px] w-[125px]" />
      </div>
      <div className="flex-grow flex flex-col justify-center items-center mb-8">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="h-[96px] w-[48px] rounded-3xl" />
          <Skeleton className="w-[32px] h-[32px] rounded-full" />
        </div>
      </div>
      <div className="pb-4">
        <Skeleton className="h-[26px] rounded-3xl w-full" />
      </div>
    </Card>
  )
}

export function CurrentWeather(props: CurrentWeatherProps): JSX.Element {
  const currentTime = format(new Date(), 'HH:mm:ss')
  const currentDay = format(new Date(), 'EEEE', { locale: zhCN })
  // assume the maximum temperature is 50 and the minium is -20
  const weatherAsPercentage = (props.temperature + 20) / 70
  return (
    <Card className="w-[325px] max-w-[325px] p-4 h-[300px] max-h-[300px] flex flex-col text-gray-50 bg-black">
      <div className="flex justify-between items-center mb-1">
        <p className="font-medium">{currentDay}</p>
        <p className="font-medium">{currentTime}</p>
      </div>
      <div className="text-left mb-4 flex justify-between">
        <p className="font-medium">
          {props.province}
          ,
          {props.city}
        </p>
        <p>{props.weather}</p>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center mb-8">
        <div>
          <p className="text-[96px] font-bold">
            {props.temperature}
            &deg;
          </p>
        </div>
      </div>
      <div className="pb-4">
        <Progress aria-label="Temperature" value={weatherAsPercentage * 100} />
      </div>
    </Card>
  )
}
