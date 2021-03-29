import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { errors, setError } = useForm();
    const handleSubmit = () => {
        const user = {
            username: username,
            email: email,
            password: password
        };

        axios('/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: user
        })
            .then((response) => (window.location.href = `/login`))
            .catch((error) => {
                const errors = error.response.data;
                setError('server', {
                    type: 'server',
                    message: errors
                });
            });
    };

    return (
        <>
            <Form
                onUsernameChange={setUsername}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                isregister
                error={errors}
            />
        </>
    );
};

export default Register;
