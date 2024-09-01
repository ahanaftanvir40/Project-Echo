'use client'

import qs from 'query-string'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Video, VideoOff } from 'lucide-react'
import ActionTooltip from '../ActionTooltip'


function ChatVideoButton() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const isVideo = searchParams?.get('video')

    const handleClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || '',
            query: {
                video: isVideo ? undefined : true
            }
        })

        router.push(url)
    }

    const Icon = isVideo ? VideoOff : Video
    const tooltipLabel = isVideo ? 'End video call' : 'Start Video'

    return (
        <ActionTooltip side='bottom' label={tooltipLabel}>
            <button onClick={handleClick} className='hover:opacity-75 transition mr-4'>
                <Icon className='w-6 h-6 text-zinc-500 dark:text-zinc-400' />
            </button>
        </ActionTooltip>
    )
}

export default ChatVideoButton
