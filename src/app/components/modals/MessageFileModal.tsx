'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Button } from '../ui/button'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '../FileUpload'
import { useModal } from '@/hooks/use-modal-store'

const formSchema = z.object({
    fileUrl: z.string().min(1, { message: 'Attachment is required' })

})

function MessageFileModal() {
    const { isOpen, onClose, type, data } = useModal()
    const { apiUrl, query } = data
    const router = useRouter()

    const isModalOpen = isOpen && type === 'messageFile'

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
        }
    })

    const isLoading = form.formState.isSubmitting

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log(data);

        try {
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query: query
            })
            await axios.post(url, {
                ...data,
                content: data.fileUrl
            })

            form.reset()
            router.refresh()
            handleClose()


        } catch (error) {

        }

    }




    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Upload File
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField
                                    control={form.control}
                                    name='fileUrl'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint='messageFile'
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button variant={'primary'} disabled={isLoading} type="submit">Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFileModal
