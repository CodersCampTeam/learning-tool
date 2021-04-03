import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, TextField, Box, Typography, Grid, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { StyledError } from '../Form/styles';
import axios from 'axios';

const ProfileInputFields = (): ReactElement => {
    useEffect(() => {
        axios
            .get('/api/profile', { withCredentials: true })
            .then((json) => {
                usernameSetValue('username', json.data.username);
                emailSetValue('email', json.data.email);
            })
            .catch((error) => {
                throw new Error(error.reponse);
            });
    }, ['username', 'email']);

    const {
        register: usernameRegister,
        handleSubmit: usernameSubmit,
        errors: usernameErrors,
        getValues: usernameGetValues,
        setValue: usernameSetValue,
        setError: setUsernameError
    } = useForm();
    const {
        register: emailRegister,
        handleSubmit: emailSubmit,
        errors: emailErrors,
        getValues: emailGetValues,
        setValue: emailSetValue,
        setError: setEmailError
    } = useForm();
    const {
        register: passwordRegister,
        handleSubmit: passwordSubmit,
        errors: passwordErrors,
        getValues: passwordGetValues,
        setError: setPasswordError
    } = useForm({
        defaultValues: {
            password: '',
            passwordConfirmation: ''
        }
    });
    const onUsernameSubmit = () => {
        axios.post('/api/profile', { username: usernameGetValues('username') }).catch((error) => {
            setUsernameError('server', {
                type: 'server',
                message: error.response.data
            });
            throw error;
        });
    };

    const onEmailSubmit = () => {
        axios.post('/api/profile', { email: emailGetValues('email') }).catch((error) => {
            setEmailError('server', {
                type: 'server',
                message: error.response.data
            });
            throw error;
        });
    };

    const onPasswordSubmit = () => {
        axios.post('/api/profile', { password: passwordGetValues('password') }).catch((error) => {
            setPasswordError('password', {
                type: 'server',
                message: error.response.data
            });
            throw error;
        });
    };

    return (
        <Grid item xs={12}>
            <Typography variant="body1" align="center" color="textPrimary">
                TWOJE DANE
            </Typography>
            <Paper>
                <Box m={2} p={1}>
                    <form onSubmit={usernameSubmit(onUsernameSubmit)} autoComplete="off">
                        <h4>Zmień nickname</h4>
                        <TextField
                            autoFocus
                            helperText="Nickname"
                            name="username"
                            variant="standard"
                            size="small"
                            inputRef={usernameRegister({ minLength: 2, maxLength: 30 })}
                        />
                        <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                            <SaveIcon />
                        </IconButton>
                        {usernameErrors.username && <StyledError>Nickname musi mieć od 2 do 30 znaków.</StyledError>}
                        {usernameErrors?.server && <StyledError>{usernameErrors?.server.message}</StyledError>}
                    </form>
                    <form onSubmit={emailSubmit(onEmailSubmit)} autoComplete="off">
                        <h4>Zmień e-mail</h4>
                        <TextField
                            helperText="Email"
                            variant="standard"
                            size="small"
                            name="email"
                            type="email"
                            inputRef={emailRegister({ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                        />
                        <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                            <SaveIcon />
                        </IconButton>
                        {emailErrors.email && <StyledError>Wprowadzony email jest niepoprawny</StyledError>}
                        {emailErrors?.server && <StyledError>{emailErrors?.server.message}</StyledError>}
                    </form>
                    <form onSubmit={passwordSubmit(onPasswordSubmit)} autoComplete="off">
                        <h4>Zmień hasło</h4>
                        <TextField
                            helperText="Nowe hasło"
                            variant="standard"
                            size="small"
                            name="password"
                            inputRef={passwordRegister({
                                pattern: /^(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\d@$!%*?&]{8,1024}$/
                            })}
                        />
                        {passwordErrors.password && passwordErrors.password.type === 'server' && (
                            <StyledError>{passwordErrors.password?.message}</StyledError>
                        )}
                        {passwordErrors.password && passwordErrors.password.type === 'pattern' && (
                            <StyledError>
                                Hasło powinno składać się z min. 8 znaków, w tym dużych i małych liter, liczb oraz
                                znaków specjalnych.
                            </StyledError>
                        )}

                        <TextField
                            helperText="Powtórz nowe hasło"
                            variant="standard"
                            size="small"
                            name="passwordConfirmation"
                            inputRef={passwordRegister({
                                validate: (value) => {
                                    return value === passwordGetValues('password') ? true : false;
                                }
                            })}
                        />
                        <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                            <SaveIcon />
                        </IconButton>
                        {passwordErrors.passwordConfirmation && <StyledError>Hasła do siebie nie pasują.</StyledError>}
                    </form>
                </Box>
            </Paper>
        </Grid>
    );
};
export default ProfileInputFields;
