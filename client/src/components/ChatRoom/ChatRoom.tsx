import { Icon, IconButton } from '@material-ui/core';
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import useChat from '../../views/useChat';
import SendIcon from '@material-ui/icons/Send';
import { css } from '@emotion/react';
import AndroidSharpIcon from '@material-ui/icons/AndroidSharp';
import ChildCareSharpIcon from '@material-ui/icons/ChildCareSharp';

const ChatRoom = (props: any) => {
    const { messages, sendMessage, setRoomId } = useChat();
    const [newMessage, setNewMessage] = useState('');
    const { roomId } = props.match.params;
    const messagesEndRef = useRef() as MutableRefObject<any>;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setRoomId(roomId);
    }, []);

    const handleNewMessageChange = (event: any) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <>
            <Container
                css={css`
                    position: relative;
                    height: 76vh;
                    overflow: hidden;
                `}
                maxWidth="sm"
            >
                <div>
                    <h1
                        css={css`
                            text-transform: uppercase;
                            font-size: 28px;
                            margin-top: 15px;
                        `}
                    >
                        Pokój: {roomId}
                    </h1>
                    <List
                        css={css`
                            overflow-y: scroll;
                            height: 55vh;
                            &:hover {
                                overflow-y: scroll;
                            }
                        `}
                    >
                        {messages.map((message, i) => (
                            <ListItem
                                css={css`
                                    font-size: 10px;
                                    width: 90%;
                                    ${message.ownedByCurrentUser
                                        ? 'margin-left: auto; margin-right: 0'
                                        : 'margin-right: auto; margin-left: 0'}
                                `}
                            >
                                <ListItemAvatar
                                    css={css`
                                        ${message.ownedByCurrentUser
                                            ? 'display: none'
                                            : 'display: inline; padding-right: 5px;'}
                                    `}
                                >
                                    <Avatar
                                        css={css`
                                            background-color: #673ab7;
                                        `}
                                    >
                                        <AndroidSharpIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    css={css`
                                        padding: 3px 10px;
                                        border-radius: 20px;
                                        max-width: 80%;
                                        ${message.ownedByCurrentUser
                                            ? 'text-align: right; background-color: #673ab7; color: white;'
                                            : 'text-align: left; background-color: #bdbdbd;'}
                                    `}
                                >
                                    {message.body}
                                </ListItemText>
                                <ListItemAvatar
                                    css={css`
                                        ${message.ownedByCurrentUser
                                            ? 'display: inline; padding-left: 5px;'
                                            : 'display: none'}
                                    `}
                                >
                                    <Avatar
                                        css={css`
                                            background-color: #bdbdbd;
                                        `}
                                    >
                                        <ChildCareSharpIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItem>
                        ))}
                        <div ref={messagesEndRef} />
                    </List>
                </div>
                <div
                    css={css`
                        padding: 5px;
                        display: flex;
                        flex-direction: row;
                        position: absolute;
                        bottom: 0;
                        width: 90%;
                    `}
                >
                    <TextField
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Napisz wiadomość..."
                        variant="outlined"
                        fullWidth
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <IconButton
                        css={css`
                            padding-left: 5px;
                        `}
                        onClick={handleSendMessage}
                    >
                        <SendIcon>send</SendIcon>
                    </IconButton>
                </div>
            </Container>
        </>
    );
};

export default ChatRoom;
