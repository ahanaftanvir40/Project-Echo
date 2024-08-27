'use client'

import AddAServerModal from "../modals/AddAServerModal"
import EditServerModal from "../modals/EditServerModal"
import InviteModal from "../modals/InviteModal"
import MembersModal from "../modals/MembersModal"

export const ModalProvider = () => {

    return (
        <>
            <AddAServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
        </>
    )
}