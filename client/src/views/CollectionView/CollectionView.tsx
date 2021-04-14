import { Box, Button, Card, CircularProgress, Container, IconButton, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SettingsIcon from '@material-ui/icons/Settings';
import { Delete } from '@material-ui/icons';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

interface flashCard {
    _id: string;
    prompt: string;
}

export const CollectionView = (): ReactElement => {
    const [data, setData] = useState<{ name?: string; flashcards?: flashCard[] }>({});
    const [error, setError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        getFlashCardList();
    }, []);

    const getFlashCardList = async () => {
        try {
            const res = await axios.get(`/api/flashcard-collection/${id}`);
            const userResponse = await axios.get('/api/me');

            if (res.data.owner === userResponse.data._id) {
                setEditMode(true);
            }
            setData(res.data);
        } catch (err) {
            setError(true);
        }

        setLoaded(true);
    };

    const removeFlashCard = (id: string) => {
        setLoaded(false);
        axios
            .delete(`/api/flashcard/${id}`)
            .then(() => {
                getFlashCardList();
            })
            .catch((err) => setError(true));
    };

    const editFlashCard = (flashcardId: string) => {
        history.push(`/edytuj-fiszke/${id}/${flashcardId}`);
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
                <Typography variant="h5">
                    {editMode && 'Edytuj kolekcję'} "{data.name}"
                </Typography>
                {editMode && (
                    <Button
                        component={Link}
                        to={`/stworz-fiszke/${id}`}
                        style={{ marginBottom: '10px', marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                        endIcon={<AddCircle />}
                    >
                        Dodaj nową fiszkę
                    </Button>
                )}
                <Button
                    component={Link}
                    to={`/powtorka/${id}`}
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                    variant="contained"
                    color="primary"
                    endIcon={<EmojiObjectsIcon />}
                >
                    Zacznij powtórkę
                </Button>

                {data.flashcards?.map((flashcard) => (
                    <Card key={flashcard._id} style={{ margin: '15px 0' }}>
                        <Box
                            paddingX={2}
                            paddingY={1.4}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            {flashcard.prompt}

                            <div>
                                {editMode && (
                                    <>
                                        <IconButton onClick={() => removeFlashCard(flashcard._id)} aria-label="delete">
                                            <Delete color="primary" />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            style={{ marginLeft: '7px' }}
                                            onClick={() => editFlashCard(flashcard._id)}
                                            aria-label="edit"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                    </>
                                )}
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
