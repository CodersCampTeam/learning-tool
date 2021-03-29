import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { errors, setError } = useForm();
    const handleSubmit = () => {
        const user = {
            email: email,
            password: password
        };

        axios('/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: user
        })
            .then((response) => (window.location.href = `/`))
            .catch((error) => {
                setError('server', {
                    type: 'server',
                    message: error.response.data.message
                });
                throw error;
            });
    };

    return (
        <>
            <Form
                isregister={false}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                error={errors}
            />
        </>
    );
};

export default Login;
