import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:3001';

const useChat = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const socketRef: any = useRef();

    const [newRooms, setRooms] = useState<string[]>([]);
    const [roomId, setRoomName] = useState<any>();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId }
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody: any) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id
        });
    };

    const newRoom = (room: string) => {
        socketRef.current.emit('newroomcreated', { room: room });
        setRooms([room]);
    };

    const setRoomId = (roomId: any) => {
        setRoomName(roomId);
    };

    return { messages, sendMessage, newRoom, newRooms, setRoomId };
};

export default useChat;
