import { Box, Button, Container, FormControlLabel, Switch, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const CreateCollection = () => {
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const updateTags = (value: string) => {
        value = value.replace(/\s/g, '');
        const tagsArray = value.split(',').filter((e) => e);
        setTags(tagsArray);
    };

    const addCollection = () => {
        if (!name) {
            setError(true);
            return;
        }
        axios
            .post('/api/flashcard-collection', {
                name,
                isPublic,
                tags
            })
            .then((res) => {
                setRedirect(true);
            });
    };

    const toggleIsPublic = (value: boolean) => {
        setIsPublic(value);
    };

    const onNameChange = (value: string) => {
        setError(false);
        setName(value);
    };

    return (
        <>
            {redirect && <Redirect to="/kolekcje" />}
            <Container maxWidth="sm">
                <Box m={4} textAlign="center">
                    <h1>Tworzenie kolekcji</h1>
                </Box>
                <Box m={4}>
                    <TextField
                        error={error}
                        label="Nazwa kolekcji*"
                        helperText="To pole jest wymagane"
                        onChange={(e) => onNameChange(e.target.value)}
                        fullWidth={true}
                    />
                </Box>
                <Box m={4}>
                    <TextField
                        onChange={(e) => updateTags(e.target.value)}
                        label="Tagi (rozdzielone po przecinku)"
                        fullWidth={true}
                    />
                </Box>
                <Box m={5} textAlign="center">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isPublic}
                                onChange={(e) => toggleIsPublic(e.target.checked)}
                                color="secondary"
                            />
                        }
                        label="Publiczna kolekcja"
                    />
                </Box>
                <br />
                <Box textAlign="center">
                    <Button onClick={addCollection} variant="contained" color="primary" endIcon={<SaveIcon />}>
                        Zapisz
                    </Button>
                </Box>
            </Container>
        </>
    );
};
