import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

// interface ServerIdPageProps {
//   para
// }

async function ServerIdPage({ params }: { params: { serverId: string } }) {

  const profile = await currentProfile()

  if (!profile) {
    return auth().redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: 'general'
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name === 'general') {
    return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
  }

  return (
    <div className=''>
      <h1>server id</h1>

    </div>
  )
}

export default ServerIdPage
