import React, { useState, useEffect, useContext } from "react"
import AiModelList from './../../shared/AiModelList'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { Loader, Lock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SelectLabel } from '@radix-ui/react-select'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import { ArrowLeftRight } from "lucide-react"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useAuth, useUser } from '@clerk/nextjs' 
//import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import { useSearchParams } from 'next/navigation'
function AiMultiModels() {
    const{user}= useUser();
    const [aiModelList, setAiModelList] = useState(AiModelList)
    const { aiSelectedModels, setAiSelectedModels} = useContext(AiSelectedModelContext);
    const onToggleChange = (model, value) => {
            setAiModelList((prev) =>
                prev.map((m) =>
                    m.model === model ? { ...m, enable: value } : m))

            setAiSelectedModels((prev) => ({
                ...prev,
                [model]: {
                    ...(prev?.[model] ?? {}),
                    enable: value
                }
            }))
        }
/* 
    const { has } = useAuth();

        setAiSelectedModels((prev) => ({
            ...prev,
            [model]: {
                ...(prev?.[model] ?? {}),
                enable: value
            }
        }))
    }
*/
    const onSelecteValue = async (parentModel, value) => {
        setAiSelectedModels(prev => ({
            ...prev,
            [parentModel]: {
      ...(prev?.[parentModel] ?? {}),  // ✅ preserve existing props (enable)
      modelId: value
            }
        }))

/*         //Update to Firebase Database
        const docRef=doc(db,"users", user?.primaryEmailAddress?.emailAddress);
        await updateDoc(docRef,{selectedModelPref:aiSelectedModels})
 */
    } 

    return (
        <div className="flex flex-1 h-[75vh] border-b">
            {aiModelList.map((model, index) => (
                <div 
                    key={index}
                    className={`flex flex-col border-r h-full overflow-auto transition-all duration-300
                           ${model.enable ? 'flex-[2] min-w-[400px]' : 'flex-none w-[80px]'}`}
                >
                    <div className="flex w-full h-[70px] gap-2 items-center justify-between border-b p-4">
                        <div className="flex items-center gap-4 w-full">
                            <Image
                                src={model.icon}
                                alt={model.model}
                                width={24}
                                height={24}
                            />

                           
                        
                            {model.enable && aiSelectedModels[model.model]?.enable && (
                                <Select value={aiSelectedModels[model.model]?.modelId}
                                    onValueChange={(value) => onSelecteValue(model.model, value)}
                                    disabled={model.premium}
                                >

                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={aiSelectedModels[model.model]?.modelId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                                            {model.subModel.map((subModel, i) => subModel.premium == false && (
                                               <SelectItem key={i} value={subModel.id}>{subModel.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className='text-sm text-gray-400'>Premium</SelectLabel>
                                            {model.subModel.map((subModel, i) => subModel.premium == true && (
                                                <SelectItem key={i} value={subModel.id}>{subModel.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>)}
                            
                        </div>
                        {<div>
                            {model.enable? <Switch 
                                checked ={model.enable} 
                                onCheckedChange={(v) => onToggleChange(model.model, v)}
                            />
                            : <ArrowLeftRight
                                    className="cursor-pointer h-5 w-5"
                                    onClick={() => onToggleChange(model.model, true)}
                                />}
                            {/* {model.enable && aiSelectedModels[model.model]?.enable ? (
                                <Switch
                                    checked={model.enable}
                                    disabled={has && !has({ plan: 'unlimited_plan' }) && model.premium}
                                    onCheckedChange={(v) => onToggleChange(model.model, v)}
                                />
                            ) : (
                                <MessageSquare
                                    className="cursor-pointer h-5 w-5"
                                    onClick={() => onToggleChange(model.model, true)}
                                />
                            )} */}
                        </div>}
                       
                    </div>
                    { model.premium && model.enable && <div className='flex items-center justify-center h-full'>
                        <Button> <Lock /> Upgrade to unlock</Button>
                    </div>}

                    {/* {model.enable && aiSelectedModels[model.model]?.enable && (!model.premium || has({ plan: 'unlimited_plan' })) && < div className='flex-1 p-4'>
                        <div className='flex-1 p-4 space-y-2 '>
                            {messages[model.model]?.map((m, i) => (
                                <div
                                    className={`p-2 rounded-md ${m.role == 'user' ?
                                        "bg-blue-100 dark:bg-zinc-700 text-blue-900 dark:text-white"
                                        : "bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {m.role == 'assistant' && (
                                        <span className='text-sm text-gray-400'>{m.model ?? model.model}</span>
                                    )}
                                    <div className='flex gap-3 items-center'>
                                        {m.content == 'loading' && <><Loader className='animate-spin' /><span>Thinking...</span></>}</div>
                                    {m && m.content && m.content !== 'loading' && (
                                        <ReactMarkdown className="prose prose-sm max-w-full overflow-x-auto">
                                            {m?.content?.toString() || ''}
                                        </ReactMarkdown>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>} */}
                </div>
            ))
            }


        </div >
    )
}

export default AiMultiModels
