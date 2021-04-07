import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, TextField, Box, Typography, Grid, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { StyledError } from '../Form/styles';
import axios from 'axios';

const PasswordFields = (): ReactElement => {
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
                    Hasło powinno składać się z min. 8 znaków, w tym dużych i małych liter, liczb oraz znaków
                    specjalnych.
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
    );
};
export default PasswordFields;
