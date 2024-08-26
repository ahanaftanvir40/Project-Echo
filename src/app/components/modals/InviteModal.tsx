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


import FileUpload from '../FileUpload'
import { useModal } from '@/hooks/use-modal-store'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, Copy, RefreshCw } from 'lucide-react'
import useOrigin from '@/hooks/use-origin'


function InviteModal() {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data
    const isModalOpen = isOpen && type === 'invite'


    const origin = useOrigin()
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    const onNew = async () => {
        try {
            setLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen('invite', { server: response.data })
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
                        Invite Buddies
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label className='uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 '>
                        Server Invite Link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input
                            className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                            value={inviteUrl}
                            disabled={loading}
                        />

                        <Button onClick={onCopy} size='icon' disabled={loading}>
                            {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
                        </Button>
                    </div>
                    <Button onClick={onNew} disabled={loading} variant='link' size='sm' className='text-sm text-zinc-500 mt-4'>
                        Generate a new link
                        <RefreshCw className='w-4 h-4 ml-2' />
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal
