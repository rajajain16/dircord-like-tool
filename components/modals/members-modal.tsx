"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { ServerWithMembersWithProfiles } from "@/types";


export const MembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    

    const isModalOpen = isOpen && type === "members"
    const { server } = data as { server : ServerWithMembersWithProfiles}
    const [isLoading, setIsLoading] = useState(false)
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onNew = async () => {
        try{
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite", { server: response.data })

        }
        catch(error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Manage Members
                    </DialogTitle>   
                    <DialogDescription
                className="text-center text-zinc-500  ">
                    {server?.members?.length} Members
                    </DialogDescription>              
                </DialogHeader> 
                
                <div className="p-6" >
                    Hello Members
                </div>
                </DialogContent>            
        </Dialog>
    )
}