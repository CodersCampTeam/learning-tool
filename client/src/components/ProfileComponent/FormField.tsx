import React, { ReactElement, useEffect, useState } from 'react';
import { TextField, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { StyledError } from '../Form/styles';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

interface IInputProps {
    header?: string;
    helperText: string;
    name: string;
    type: string;
    inputRef: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
    };
    value?: string;
    message: string;
    requireConfirmation?: boolean;
}

const FormField = (props: IInputProps): ReactElement => {
    const { register, handleSubmit, errors, getValues, setValue, setError, clearErrors } = useForm();
    useEffect(() => {
        setValue(props.name, props.value);
    }, [props.value]);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const onSubmit = (): void => {
        axios
            .post('/api/profile', { [props.name]: getValues(props.name) })
            .then(() => {
                setOpenSuccessAlert(true);
            })
            .catch((error) => {
                setError('server', {
                    type: 'server',
                    message: error.response.data
                });
                setOpenErrorAlert(true);
            });
    };

    const handleChange = () => {
        clearErrors('server');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <h4>{props.header}</h4>
            <TextField
                autoFocus
                helperText={props.helperText}
                name={props.name}
                variant="standard"
                size="small"
                type={props.type}
                inputRef={register(props.inputRef)}
                onChange={handleChange}
            />
            {!props.requireConfirmation && (
                <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                    <SaveIcon style={{ marginLeft: '20px' }} />
                </IconButton>
            )}
            {errors[props.name] && <StyledError>{props.message}</StyledError>}
            {errors?.server && <StyledError>{errors?.server.message}</StyledError>}
            {props.requireConfirmation && (
                <>
                    <TextField
                        helperText={`powtórz ${props.helperText}`}
                        variant="standard"
                        size="small"
                        type="password"
                        name="confirmation"
                        inputRef={register({
                            validate: (value) => {
                                return value === getValues(props.name) ? true : false;
                            }
                        })}
                    />
                    <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                        <SaveIcon style={{ marginLeft: '20px' }} />
                    </IconButton>
                </>
            )}
            {props.requireConfirmation && errors.confirmation && (
                <StyledError>Wartości do siebie nie pasują.</StyledError>
            )}
            <Snackbar open={openSuccessAlert} autoHideDuration={5000} onClose={() => setOpenSuccessAlert(false)}>
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setOpenSuccessAlert(false)}>
                    Pomyślnie zapisano!
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openErrorAlert} autoHideDuration={5000} onClose={() => setOpenErrorAlert(false)}>
                <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setOpenErrorAlert(false)}>
                    Wystąpił błąd!
                </MuiAlert>
            </Snackbar>
        </form>
    );
};
export default FormField;
