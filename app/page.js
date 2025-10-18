"use client"
import { Button } from "@/components/ui/button";
import useTheme from "next-theme";
import Image from "next/image";

export default function Home() {
  const {setTheme}=useTheme();
  return (
    <div>Let Go
      <Button onClick={()=>setTheme('dark')} >Dark</Button>
      <Button onClick={()=>setTheme('light')} >Light</Button> 
    </div>
  );
}
