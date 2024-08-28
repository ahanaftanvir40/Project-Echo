import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";




export async function DELETE(req: NextRequest, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile()
        const { searchParams } = req.nextUrl
        const serverId = searchParams.get('serverId')

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!serverId) {
            return new NextResponse('No Server ID', { status: 400 })
        }

        if (!params.channelId) {
            return new NextResponse('No Channel ID', { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: 'general'
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)


    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}