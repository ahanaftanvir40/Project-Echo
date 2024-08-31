import ChatHeader from '@/app/components/chat/ChatHeader'
import ChatInput from '@/app/components/chat/ChatInput'
import ChatMessages from '@/app/components/chat/ChatMessages'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

async function ChannelIdPage({ params }: { params: { serverId: string, channelId: string } }) {

  const profile = await currentProfile()

  if (!profile) {
    return auth().redirectToSignIn()
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    }
  })



  if (!channel || !member) {
    return redirect('/main')
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col min-h-screen'>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type='channel'
      />
      
        <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type='channel'
        apiUrl='/api/messages'
        socketUrl='/api/socket/messages'
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId
        }}
        paramKey='channelId'
        paramValue={channel.id}
        />
      
      <ChatInput
        name={channel.name}
        type='channel'
        apiUrl='/api/socket/messages'
        query={{
          channelId: channel.id,
          serverId: channel.serverId
        }}
      />
    </div>
  )
}

export default ChannelIdPage
