import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { errors, setError } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

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
            .then((response) => {
                history.replace(from);
            })
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
