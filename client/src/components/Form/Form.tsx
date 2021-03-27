import { Checkbox, FormControlLabel, Icon, Theme } from '@material-ui/core';
import {
    StyledButtonGoogle,
    StyledForm,
    StyledTextField,
    StyledLink,
    StyledButton,
    orParagraph,
    StyledFormControlLabel
} from './styles';
import React, { FormEvent } from 'react';
import { css } from '@emotion/react';
import { Grid } from './styles';
import { Search } from '@trejgun/material-ui-icons-google';
import { Container } from '@material-ui/core';

interface FormProps {
    isregister?: boolean;
    onUsernameChange?: (e: string) => void;
    onEmailChange: (e: string) => void;
    onPasswordChange: (e: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const handleGoogleRedirect = () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors' as RequestMode
    };

    fetch(`/api/google`, requestOptions)
        .then((response) => {
            window.location.href = `/`;
        })
        .catch((err) => {
            console.error(err);
        });
};

const Form = ({ isregister, onUsernameChange, onEmailChange, onPasswordChange, onSubmit }: FormProps) => {
    return (
        <>
            <Container maxWidth="sm">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={1}
                    mt={4}
                >
                    <Grid item xs={12}>
                        <StyledButtonGoogle onClick={() => handleGoogleRedirect()} variant="outlined">
                            <Search
                                css={css`
                                    margin-right: 10px;
                                `}
                            />
                            Kontynuuj przez Google
                        </StyledButtonGoogle>
                        <p css={orParagraph}>LUB</p>
                        <StyledForm onSubmit={(e) => onSubmit(e)} noValidate autoComplete="off">
                            <StyledTextField
                                isdisplay={isregister?.toString()}
                                className="test"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                required
                                placeholder="Nazwa użytkownika/użytkowniczki *"
                                autoFocus
                                onChange={(e) => onUsernameChange && onUsernameChange(e.target.value)}
                            />
                            <StyledTextField
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                required
                                placeholder="Email *"
                                onChange={(e) => onEmailChange(e.target.value)}
                            />
                            <StyledTextField
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                required
                                placeholder="Hasło *"
                                onChange={(e) => onPasswordChange(e.target.value)}
                            />
                            <StyledFormControlLabel
                                isdisplay={isregister?.toString()}
                                control={
                                    <Checkbox
                                        style={{
                                            color: ' #2f2e41'
                                        }}
                                    />
                                }
                                label="Akceptuję warunki korzystania i politykę prywatności FiszQI"
                            />
                            <StyledButton type="submit" variant="contained">
                                {isregister ? `ZAREJESTRUJ` : 'ZALOGUJ SIĘ'}
                            </StyledButton>
                        </StyledForm>
                        <StyledLink to={isregister ? '/login' : '/register'}>
                            {isregister ? `Masz już konto? Zaloguj się` : `Nie masz konta? Zarejestruj się`}
                        </StyledLink>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Form;
