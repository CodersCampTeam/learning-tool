import React from 'react';
import { Paper, TextField, IconButton, Box } from '@material-ui/core';
import { useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const ProfileInputFields = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (e: any) => {
        setUsername(e.target.value);
    };
    const updateEmail = (e: any) => {
        setEmail(e.target.value);
    };
    const updatePassword = (e: any) => {
        setPassword(e.target.value);
    };
    return (
        <Paper>
            <Box m={2} p={1}>
                <form>
                    <TextField
                        onChange={updateUsername}
                        autoFocus
                        label="Nickname"
                        value={username || ''}
                        variant="standard"
                        size="small"
                    />
                    <IconButton edge="end" aria-label="zapisz" color="primary">
                        <DoneOutlineIcon />
                    </IconButton>
                </form>
                <form>
                    <TextField
                        label="Email"
                        value={email || ''}
                        variant="standard"
                        size="small"
                        onChange={updateEmail}
                    />
                    <IconButton edge="end" aria-label="zapisz" color="primary">
                        <DoneOutlineIcon />
                    </IconButton>
                </form>
                <form>
                    <TextField
                        label="Hasło"
                        value={password || ''}
                        variant="standard"
                        size="small"
                        onChange={updatePassword}
                    />
                    <IconButton edge="end" aria-label="zapisz" color="primary">
                        <DoneOutlineIcon />
                    </IconButton>
                </form>
            </Box>
        </Paper>
    );
};
export default ProfileInputFields;
