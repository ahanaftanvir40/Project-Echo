'use client'

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import Image from 'next/image';


interface FileUploadProps{
    onChange: (url?:string)=>void;
    value:string
    endpoint: 'messageFile' | 'serverImage'
}

function FileUpload({
    onChange,
    value,
    endpoint
} : FileUploadProps) {


    const fileType = value?.split('.').pop()

    if(value && fileType !=='pdf'){
        return (
            <div className='relative h-20 w-20'>
                <Image fill src={value} alt='Image' className='rounded-full' />

                <button type='button' onClick={()=>onChange('')} className='bg-red-500 text-white p-1 absolute top-0 right-0 rounded-full'>
                    <X className='w-4 h-4' />
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
    }}
    onUploadError={(error:Error)=>{
        console.log(error);
        
    }}
    />
  )
}

export default FileUpload
