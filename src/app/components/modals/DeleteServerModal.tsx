'use client'
import React, { useState } from 'react'
import axios from 'axios'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"

import { Button } from '../ui/button'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'



function DeleteServerModal() {
    const router = useRouter()
    const { isOpen, onClose, type, data } = useModal()
    const { server } = data
    const isModalOpen = isOpen && type === 'deleteServer'

    const [loading, setLoading] = useState(false)


    const handleConfirm = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/servers/${server?.id}`)

            onClose()
            router.push('/main')

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }




    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are you sure you want to proceed? <br /><span className='font-semibold text-indigo-500'>{server?.name}</span> will be permanently deleted. 😢
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className=' flex items-center justify-between w-full'>
                        <Button
                            disabled={loading}
                            onClick={onClose}
                            variant='ghost'
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            onClick={handleConfirm}
                            variant='primary'
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServerModal
