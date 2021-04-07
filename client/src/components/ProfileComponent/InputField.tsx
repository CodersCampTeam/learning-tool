import React, { FormEvent, ReactElement, useEffect } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
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
        validate?: any;
    };
    value?: string;
    message: string;
    requireConfirmation?: boolean;
}

const InputField = (props: IInputProps): ReactElement => {
    const { register, handleSubmit, errors, getValues, setValue, setError, clearErrors } = useForm();
    useEffect(() => {
        setValue(props.name, props.value);
    }, [props.value]);
    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        axios
            .post('/api/profile', { [props.name]: getValues(props.name) })
            .then(() => {
                //tutaj snackbary
            })
            .catch((error) => {
                setError('server', {
                    type: 'server',
                    message: error.response.data
                });
                throw error;
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
            <IconButton edge="end" aria-label="zapisz" color="primary" type="submit">
                <SaveIcon />
            </IconButton>
            {errors[props.name] && <StyledError>{props.message}</StyledError>}
            {errors?.server && <StyledError>{errors?.server.message}</StyledError>}
        </form>
    );
};
export default InputField;
