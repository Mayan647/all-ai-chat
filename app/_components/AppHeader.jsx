import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function AppHeader() {
    return (
        <header className="fixed w-full bg-white z-50 dark:bg-zinc-900 shadow-md p-3 flex justify-between items-center">
            <SidebarTrigger className="cursor-pointer" />
            <Button>Sign In</Button>
        </header>
    )
}

export default AppHeader
