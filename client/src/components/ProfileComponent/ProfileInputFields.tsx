import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, TextField, Box, Typography, Grid, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { StyledError } from '../Form/styles';
import axios from 'axios';
import InputField from './InputField';

const ProfileInputFields = (): ReactElement => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios
            .get('/api/profile', { withCredentials: true })
            .then((json) => {
                setUsername(json.data.username);
                setEmail(json.data.email);
            })
            .catch((error) => {
                throw new Error(error.reponse);
            });
    }, []);

    return (
        <Grid item xs={12}>
            <Typography variant="body1" align="center" color="textPrimary">
                TWOJE DANE
            </Typography>
            <Paper>
                <Box m={2} p={1}>
                    <InputField
                        header={'Zmień nickname'}
                        helperText={'Nickname'}
                        name={'username'}
                        value={username}
                        type={'text'}
                        inputRef={{ minLength: 2, maxLength: 30 }}
                        message={'Nickname musi mieć od 2 do 30 znaków.'}
                    />
                    <InputField
                        header={'Zmień e-mail'}
                        helperText={'Email'}
                        name={'email'}
                        value={email}
                        type={'email'}
                        inputRef={{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
                        message={'Wprowadzony email jest niepoprawny'}
                    />
                    <InputField
                        header={'Zmień hasło'}
                        helperText={'Nowe hasło'}
                        name={'password'}
                        type={'text'}
                        inputRef={{
                            pattern: /^(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\d@$!%*?&]{8,1024}$/
                        }}
                        message={
                            'Hasło powinno składać się z min. 8 znaków, w tym dużych i małych liter, liczb oraz znaków specjalnych.'
                        }
                    />
                </Box>
            </Paper>
        </Grid>
    );
};
export default ProfileInputFields;
