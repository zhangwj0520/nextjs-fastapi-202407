import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default async function Signout() {
  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <Skeleton className="h-[80px] w-full rounded-xl" />
      <div className="flex">
        <Skeleton className="h-10 flex-1 mr-2" />
        <Skeleton className="h-10 flex-1 mr-2" />
        <Skeleton className="h-10 flex-1" />
      </div>
      <Skeleton className="h-[125px] w-full rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[125px] w-full rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Dialog defaultOpen={true}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>提示</DialogTitle>
            <DialogDescription>
              <span>鉴权失败,请重新登录!</span>
              <form
                action={async () => {
                  'use server'
                  await signOut()
                }}
                className=""
              >

                <Button
                  className="my-4 flex h-10 w-full mt-4"
                >
                  登录
                </Button>

              </form>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
