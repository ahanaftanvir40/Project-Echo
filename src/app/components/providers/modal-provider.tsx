'use client'

import AddAServerModal from "../modals/AddAServerModal"
import CreateChannelModal from "../modals/CreateChannelModal"
import DeleteServerModal from "../modals/DeleteServerModal"
import EditServerModal from "../modals/EditServerModal"
import InviteModal from "../modals/InviteModal"
import LeaveServerModal from "../modals/LeaveServerModal"
import MembersModal from "../modals/MembersModal"

export const ModalProvider = () => {

    return (
        <>
            <AddAServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
        </>
    )
}