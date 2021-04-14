import { Box, Button, Container, FormControlLabel, Switch, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const CreateCollection = () => {
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [tagError, setTagError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const updateTags = (value: string) => {
        value = value.replace(/\s/g, '');
        const tagsArray = value.split(',').filter((e) => e);
        setTags(tagsArray);
        setTagError(false);
    };

    const addCollection = () => {
        let error = false;
        if (!name) {
            setNameError(true);
            error = true;
        }
        if (tags.length < 1) {
            setTagError(true);
            error = true;
        }
        if (error) {
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
        setNameError(false);
        setName(value);
    };

    return (
        <>
            {redirect && <Redirect to="/kolekcje" />}
            <Container maxWidth="sm">
                <Box m={4} textAlign="center">
                    <Typography variant="h2">TWORZENIE KOLEKCJI</Typography>
                </Box>
                <Box m={4}>
                    <TextField
                        error={nameError}
                        label="Nazwa kolekcji*"
                        helperText="To pole jest wymagane"
                        onChange={(e) => onNameChange(e.target.value)}
                        fullWidth={true}
                    />
                </Box>
                <Box m={4}>
                    <TextField
                        error={tagError}
                        onChange={(e) => updateTags(e.target.value)}
                        helperText="min. 1 tag jest wymagany"
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
                                color="primary"
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
