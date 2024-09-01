import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const profile = await currentProfile()
        const { searchParams } = req.nextUrl
        const cursor = searchParams.get('cursor')
        const conversationId = searchParams.get('conversationId')

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!conversationId) {
            return new NextResponse('conversation id missing', { status: 401 })
        }

        let messages: DirectMessage[] = []
        const MESSAGES_BATCH = 10

        if (cursor) {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId: conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }

        let nextCursor = null

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}