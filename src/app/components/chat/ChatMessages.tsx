'use client'

import { Member, Message, Profile } from '@prisma/client'
import React from 'react'
import ChatWelcome from './ChatWelcome'
import { UseChatQuery } from '@/hooks/use-chat-query'
import { Loader2, ServerCrash } from 'lucide-react'

interface ChatMessagesProps {
    name: string
    member: Member
    chatId: string
    apiUrl: string
    socketUrl: string
    socketQuery: Record<string, any>
    paramKey: 'channelId' | 'conversationId'
    paramValue: string
    type: 'channel' | 'conversation'
}

interface MessageWithMemberWithProfile extends Message {
    member: Member & {
        profile: Profile
    }
}

function ChatMessages({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps) {

    const queryKey = `chat:${chatId}`
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = UseChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    if (status === "pending") {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-z4'>Loading messages...</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <ServerCrash className='h-7 w-7 text-zinc-500 my-4' />
                <p className='text-xs text-zinc-500 dark:text-z4'>Something went wrong!</p>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col py-4 overflow-y-auto'>
            <div className='flex-1' />

            <ChatWelcome
                name={name}
                type={type}
            />

            <div className='flex flex-col-reverse mt-auto'>
                {data?.pages.map((group, i) => (
                    <div key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <div key={message.id}>
                                {message.content}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatMessages
