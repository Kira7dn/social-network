'use client'

import { ChevronsLeftRight } from 'lucide-react'
import {
  useUser,
  SignOutButton,
} from '@clerk/clerk-react'

import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'

import { UserButton } from '@clerk/nextjs'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../../ui/menubar'
import {
  redirect,
  useRouter,
} from 'next/navigation'

export const UserItem = () => {
  const { isSignedIn, user } = useUser()
  const router = useRouter()

  if (!isSignedIn) return null
  return (
    <UserButton />
    // <Menubar className="border-transparent px-2">
    //   <MenubarMenu>
    //     <MenubarTrigger className="cursor-pointer px-0 py-0 ">
    //       <div
    //         role="button"
    //         className="text-sm flex h-full w-full items-center rounded-lg"
    //       >
    //         <div className="flex h-full w-full max-w-[200px] items-center gap-x-2">
    //           <Avatar className="h-8 w-8">
    //             <AvatarImage
    //               src={user.imageUrl}
    //             />
    //           </Avatar>
    //           <span className="line-clamp-1 text-start font-medium">
    //             {user.fullName}
    //           </span>
    //         </div>
    //         <ChevronsLeftRight className="text-muted-foreground ml-2 h-4 w-4 rotate-90" />
    //       </div>
    //     </MenubarTrigger>
    //     <MenubarContent
    //       className="w-80"
    //       align="center"
    //       alignOffset={11}
    //       forceMount
    //     >
    //       <div className="z-10 flex flex-col space-y-4 p-2">
    //         <p className="text-xs text-muted-foreground font-medium leading-none">
    //           {
    //             user.emailAddresses[0]
    //               .emailAddress
    //           }
    //         </p>
    //         <div className="flex items-center gap-x-2">
    //           <div>
    //             <Avatar className="h-12 w-12">
    //               <AvatarImage
    //                 src={user.imageUrl}
    //               />
    //             </Avatar>
    //           </div>
    //           <div className="space-y-1">
    //             <p className="text-sm line-clamp-2">
    //               {user.fullName}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <MenubarSeparator />
    //       <MenubarItem
    //         asChild
    //         className="text-muted-foreground w-full cursor-pointer"
    //       >
    //         <SignOutButton
    //           signOutCallback={() =>
    //             router.push('/')
    //           }
    //         >
    //           Log out
    //         </SignOutButton>
    //       </MenubarItem>
    //     </MenubarContent>
    //   </MenubarMenu>
    // </Menubar>
  )
}
