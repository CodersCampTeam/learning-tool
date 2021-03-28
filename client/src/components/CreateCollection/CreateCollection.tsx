import { Box, Button, Container, FormControlLabel, Switch, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import React, { useEffect, useState } from 'react';

export const CreateCollection = () => {
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState(false);

    const updateTags = (value: string) => {
        value = value.replaceAll(/\s/g, '');
        const tagsArray = value.split(',').filter((e) => e);
        setTags(tagsArray);
    };

    const addCollection = () => {
        if (!name) {
            setError(true);
            return;
        }
    };

    const toggleIsPublic = (value: boolean) => {
        setIsPublic(value);
    };

    const onNameChange = (value: string) => {
        setError(false);
        setName(value);
    };

    useEffect(() => {
        console.log(name, tags, isPublic);
    }, [name, isPublic, tags]);

    return (
        <>
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
                                color="default"
                            />
                        }
                        label="Publiczna kolekcja"
                    />
                </Box>
                <br />
                <Box textAlign="center">
                    <Button onClick={addCollection} variant="contained" color="primary" endIcon={<SaveIcon />}>
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
};
