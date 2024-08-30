import ChatHeader from '@/app/components/chat/ChatHeader'
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
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type='channel'
      />
    </div>
  )
}

export default ChannelIdPage
