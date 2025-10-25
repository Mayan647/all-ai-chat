"use client";

import React, { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/AppSidebar';
import AppHeader from './_components/AppHeader';
import { useUser } from "@clerk/nextjs"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '@/config/FirebaseConfig'

function Provider({
  children,
  ...props
}) {

  const { user } = useUser();

  useEffect(()=> {
    if(user)
    {
      CreateNewUser();
    }
  },[user])

  const CreateNewUser = async () => {
        //If user exist?
        const userRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            console.log('Existing User');
            const userInfo = userSnap.data();
            //setAiSelectedModels(userInfo?.selectedModelPref ? userInfo?.selectedModelPref : DefaultModel);
            //setUserDetail(userInfo);
            return;
        } else {
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                createdAt: new Date(),
                reminaingMsg: 5,//Only for Free users
                plan: 'Free',
                //selectedModelPref: DefaultModel,
                credits: 1000 //Paid User
            }
            await setDoc(userRef, userData);
            console.log('New User data saved');
            // setUserDetail(userData);

        }

        //if Not then insert

  }
  return (
    <NextThemesProvider  {...props}
             attribute="class"
             defaultTheme="system"
             enableSystem
             disableTransitionOnChange>
            <SidebarProvider>
                <AppSidebar/> 
                <div className='w-full'> <AppHeader/> {children} </div>
            </SidebarProvider>
    </NextThemesProvider>
    
  )
}

export default Provider