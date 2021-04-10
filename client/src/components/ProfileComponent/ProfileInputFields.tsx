import React, { ReactElement, useEffect, useState } from 'react';
import { Paper, Box, Typography, Grid } from '@material-ui/core';
import axios from 'axios';
import FormField from './FormField';

const ProfileFormFields = (): ReactElement => {
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
                    <FormField
                        header={'Zmień nickname'}
                        helperText={'nickname'}
                        name={'username'}
                        value={username}
                        type={'text'}
                        inputRef={{ minLength: 2, maxLength: 30 }}
                        message={'Nickname musi mieć od 2 do 30 znaków.'}
                    />
                    <FormField
                        header={'Zmień e-mail'}
                        helperText={'email'}
                        name={'email'}
                        value={email}
                        type={'email'}
                        inputRef={{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
                        message={'Wprowadzony email jest niepoprawny'}
                    />
                    <FormField
                        header={'Zmień hasło'}
                        helperText={'nowe hasło'}
                        name={'password'}
                        type={'password'}
                        inputRef={{
                            pattern: /^(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*\d)(?=.*[!@#$%^&*()\-__+.]).{8,1024}$/
                        }}
                        message={
                            'Hasło powinno składać się z min. 8 znaków, w tym dużych i małych liter, liczb oraz znaków specjalnych.'
                        }
                        requireConfirmation={true}
                    />
                </Box>
            </Paper>
        </Grid>
    );
};
export default ProfileFormFields;
