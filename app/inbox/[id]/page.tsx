import { getUserId } from "../../lib/actions";
import React from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = async ({ params }: { params: { id: string } }) => {
    // Primero validamos los parámetros
    if (!params?.id) {
        return <div>ID de conversación inválido</div>;
    }

    // Luego obtenemos la autenticación
    const [userId, token] = await Promise.all([
        getUserId(),
        getAccessToken()
    ]);

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>Debes estar autenticado para ver esta conversación</p>
            </main>
        );
    }

    try {
        // Finalmente obtenemos los datos
        const conversation = await apiService.get(`/api/chat/${params.id}/`);

        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <ConversationDetail 
                    token={token}
                    userId={userId}
                    messages={conversation.messages}
                    conversation={conversation.conversation}
                />
            </main>
        );
    } catch (error) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>Error al cargar la conversación</p>
            </main>
        );
    }
}

export default ConversationPage;