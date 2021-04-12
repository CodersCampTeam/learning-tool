import { Box, Button, Card, CircularProgress, Container, IconButton, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import { Delete } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface flashCard {
    _id: string;
    prompt: string;
}

export const CollectionView = (): JSX.Element => {
    const [data, setData] = useState<{ name?: string; flashcards?: flashCard[] }>({});
    const [error, setError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getFlashCardList();
    }, []);

    const getFlashCardList = () => {
        axios
            .get(`/api/flashcard-collection/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoaded(true);
            });
    };

    const removeFlashCard = (id: string) => {
        setLoaded(false);
        axios
            .delete(`/api/flashcard/${id}`)
            .then(() => {
                getFlashCardList();
            })
            .catch((err) => setError(true))
            .finally(() => {
                setLoaded(true);
            });
    };

    const editFlashCard = (id: string) => {
        //tutaj zrobić redirect na edycje
    };

    const generateDataView = () => {
        if (error) {
            return <h1>Error</h1>;
        } else if (!loaded) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h5">Edytuj kolekcję "{data.name}"</Typography>
                <Button
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                    variant="contained"
                    color="default"
                    endIcon={<AddCircle />}
                >
                    Dodaj nową fiszkę
                </Button>

                {data.flashcards?.map((flashcard) => (
                    <Card key={flashcard._id} style={{ margin: '15px 0' }}>
                        <Box
                            paddingX={2}
                            paddingY={0.2}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            {flashcard.prompt}

                            <div>
                                <IconButton onClick={() => removeFlashCard(flashcard._id)} aria-label="delete">
                                    <Delete />
                                </IconButton>
                                <IconButton onClick={() => editFlashCard(flashcard._id)} aria-label="edit">
                                    <SettingsIcon />
                                </IconButton>
                            </div>
                        </Box>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <>
            <Container maxWidth="sm">{generateDataView()}</Container>
        </>
    );
};
