import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                throw error;
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
            />
        </>
    );
};

export default Register;
