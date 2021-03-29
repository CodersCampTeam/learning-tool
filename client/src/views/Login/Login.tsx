import React, { ReactElement, useState } from 'react';
import Form from '../../components/Form/Form';
import axios from 'axios';

const Login = (): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
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
            .then((response) => (window.location.href = `/`))
            .catch((error) => {
                throw error;
            });
    };

    return (
        <>
            <Form isregister={false} onEmailChange={setEmail} onPasswordChange={setPassword} onSubmit={handleSubmit} />
        </>
    );
};

export default Login;
