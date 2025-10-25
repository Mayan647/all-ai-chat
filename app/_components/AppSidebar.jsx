"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Moon, Sun, User2, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs"
import UsageCreditProgress from "./UsageCreditProgress"



export function AppSidebar() {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const {user} = useUser();
  return (
    <Sidebar>
        <SidebarHeader >
            <div className="p-3">
                <div className=" flex justify-between items-center">
                    <div className="flex items-center gap-3">
                            <Image src={'/logo.png'} alt="logo" width={600} height={60}   
                     />
                    </div>
                    <div>
                        <Button
                        className="ml-2"
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        >
                        <Sun className="h-4 w-4 dark:hidden" />
                        <Moon className="h-4 w-4 hidden dark:block" />
                        </Button>
                    </div>
                </div>
                  {user ? 
                    <Button className='mt-7 w-full' size="lg">+ New Chat</Button> :
                    <SignInButton>
                      <Button className='mt-7 w-full' size="lg">+ New Chat</Button>
                      </SignInButton>}
                </div>
                
        </SidebarHeader>

      <SidebarContent>
            <SidebarGroup >
                    <div className={'p-3'} >
                        <h2 className="font-bold text-lg">Chat</h2>
                        {!user&&<p>Sign in to start chatting with multiple AI Model</p>}
                    </div>
            </SidebarGroup>
      </SidebarContent>
      <SidebarFooter > 
        <div className ='p-3 mb-10'>
          {!user? <SignInButton mode='modal'>
            <Button className={'w-full'}>Sign In/Sign Up</Button>
          </SignInButton>
          :
          <div>
            <UsageCreditProgress />
            <Button className={'w-full mb-3'}><Zap/>Upgrade your Plan</Button>
            <Button className="w-full" variant={'ghost'}> <User2/><h2>Setting</h2> </Button>
          </div>
          }
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}