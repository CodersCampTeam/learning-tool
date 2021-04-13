import { css } from '@emotion/react';
import { Box, Button, Container, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useChat from '../../views/useChat';

const Chat = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const { newRoom, newRooms } = useChat();

    useEffect(() => {
        axios.get('/api/rooms').then(({ data }) => {
            setRooms(data);
        });
    }, [newRooms]);

    const handleRoomNameChange = (event: any) => {
        setRoomName(event.target.value);
    };

    const handleRoomNameSubmit = () => {
        newRoom(roomName);
        setRoomName('');
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box m={4} textAlign="center">
                    <div>
                        <div>
                            {rooms.map((r) => (
                                <div
                                    css={css`
                                        display: flex;
                                        padding: 5px;
                                    `}
                                >
                                    <div
                                        css={css`
                                            text-transform: uppercase;
                                        `}
                                    >
                                        {r}
                                    </div>
                                    <Button
                                        variant="contained"
                                        css={css`
                                            margin-left: auto;
                                            margin-right: 0;
                                            font-size: 10px;
                                        `}
                                        href={`/czat/${r}`}
                                    >
                                        Dołącz do pokoju
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <TextField
                            css={css`
                                margin-top: 50px;
                            `}
                            type="text"
                            placeholder="Pokój"
                            value={roomName}
                            onChange={handleRoomNameChange}
                        />
                        <Button
                            css={css`
                                margin-top: 10px;
                                background-color: #673ab7;
                                color: white;
                                &:hover {
                                    background-color: #673ab7;
                                }
                            `}
                            variant="contained"
                            onClick={handleRoomNameSubmit}
                        >
                            Stwórz pokój
                        </Button>
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default Chat;
