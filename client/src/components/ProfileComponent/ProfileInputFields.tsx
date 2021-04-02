import React, { ReactElement } from 'react';
import { Paper, TextField, IconButton, Box } from '@material-ui/core';
import { useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { useForm } from 'react-hook-form';
import { StyledError } from '../Form/styles';

const ProfileInputFields = (): ReactElement => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, handleSubmit, errors } = useForm();

    // const onSubmit = (data) => {
    //     e.preventDefault();
    //     console.log(DataTransfer);
    // };
    const updateUsername = (e: React.SyntheticEvent<EventTarget>) => {
        setUsername((e.target as HTMLInputElement).value);
    };
    const updateEmail = (e: React.SyntheticEvent<EventTarget>) => {
        setEmail((e.target as HTMLInputElement).value);
    };
    const updatePassword = (e: React.SyntheticEvent<EventTarget>) => {
        setPassword((e.target as HTMLInputElement).value);
    };
    return (
        <Paper>
            <Box m={2} p={1}>
                <form>
                    <TextField
                        onChange={updateUsername}
                        autoFocus
                        label="Nickname"
                        name="username"
                        value={username || ''}
                        variant="standard"
                        size="small"
                        inputRef={register({ minLength: 2, maxLength: 30 })}
                    />
                    {errors.username && <StyledError>Nickname musi mieć 2-30 znaków.</StyledError>}
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
                        name="email"
                        inputRef={register({ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    />
                    {errors.email && <StyledError>Wprowadzony email jest niepoprawny</StyledError>}
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
                        name="password"
                        inputRef={register({
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,1024}$/
                        })}
                    />
                    {errors.password && (
                        <StyledError>
                            {' '}
                            Hasło powinno składać się z min. 8 znaków zawierać duże i małe litery, liczbę oraz znak
                            specjalny
                        </StyledError>
                    )}
                    <IconButton edge="end" aria-label="zapisz" color="primary">
                        <DoneOutlineIcon />
                    </IconButton>
                </form>
            </Box>
        </Paper>
    );
};
export default ProfileInputFields;
