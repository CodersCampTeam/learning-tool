import { Button, TextField, Box, Snackbar, Typography } from '@material-ui/core';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';

const AddFlashcard = (): ReactElement => {
    const [prompt, setPrompt] = useState('');
    const [promptError, setPromptError] = useState(false);
    const [answerError, setAnswerError] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [answer, setAnswer] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const { collectionId } = useParams<{ collectionId: string }>();
    const { flashcardId } = useParams<{ flashcardId: string }>();
    const history = useHistory();
    interface Flashcard {
        prompt: string;
        answers: string[];
        extraInfo?: string;
        collectionId: string;
        isQuizQuestion: boolean;
        correctAnswer: number;
    }

    useEffect(() => {
        const url = '/api/flashcard/';
        if (flashcardId) {
            axios.get(url + flashcardId).then((json) => {
                setPrompt(json.data.prompt);
                setAnswer(json.data.answers[0]);
                setExtraInfo(json.data.extraInfo);
            });
        }
    }, []);

    const saveFlashcard = async () => {
        if (!prompt) {
            setPromptError(true);
            return;
        }
        if (!answer) {
            setAnswerError(true);
            return;
        }

        const flashcard: Flashcard = {
            prompt: prompt,
            correctAnswer: correctAnswer,
            isQuizQuestion: false,
            collectionId: collectionId,
            answers: [answer],
            extraInfo: extraInfo || undefined
        };

        try {
            if (flashcardId) {
                await axios.patch(`/api/flashcard/${flashcardId}`, flashcard, {
                    withCredentials: true
                });
            } else {
                await axios.put(`/api/flashcard/${flashcard.collectionId}`, flashcard, {
                    withCredentials: true
                });
            }
            setOpenSuccessAlert(true);
            setTimeout(() => history.push('/kolekcje/' + collectionId), 1000);
        } catch (error) {
            setOpenErrorAlert(true);
            throw error;
        }
    };

    const handleSetPrompt = (value: string) => {
        if (value.length < 1) {
            setPromptError(true);
        } else {
            setPromptError(false);
        }
        setPrompt(value);
    };

    const handleSetAnswer = (value: string) => {
        if (value.length < 1) {
            setAnswerError(true);
        } else {
            setAnswerError(false);
        }
        setAnswer(value);
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box m={4} textAlign="center">
                    <Typography variant="h2">TWORZENIE FISZKI</Typography>
                </Box>
                <Box m={4}>
                    <TextField
                        error={promptError}
                        fullWidth
                        label="Pytanie"
                        value={prompt}
                        helperText="To pole jest wymagane"
                        onChange={(e) => handleSetPrompt(e.target.value)}
                    />
                </Box>
                <Box m={4}>
                    <TextField
                        error={answerError}
                        fullWidth
                        label="Odpowiedź"
                        value={answer}
                        helperText="To pole jest wymagane"
                        onChange={(e) => handleSetAnswer(e.target.value)}
                    />
                </Box>
                <Box m={4}>
                    <TextField
                        value={extraInfo}
                        fullWidth
                        label="Dodatkowe informacje"
                        onChange={(e) => setExtraInfo(e.target.value)}
                    />
                </Box>

                <br />
                <Box textAlign="center">
                    <Button
                        onClick={saveFlashcard}
                        variant="contained"
                        color="primary"
                        endIcon={<DoneOutlineIcon />}
                        style={{
                            marginBottom: 15
                        }}
                    >
                        Zapisz
                    </Button>
                    <Snackbar
                        open={openSuccessAlert}
                        autoHideDuration={1000}
                        onClose={() => setOpenSuccessAlert(false)}
                    >
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            severity="success"
                            onClose={() => setOpenSuccessAlert(false)}
                        >
                            Pomyślnie zapisano fiszkę!
                        </MuiAlert>
                    </Snackbar>
                    <Snackbar open={openErrorAlert} autoHideDuration={5000} onClose={() => setOpenErrorAlert(false)}>
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            severity="error"
                            onClose={() => setOpenErrorAlert(false)}
                        >
                            Wystąpił błąd!
                        </MuiAlert>
                    </Snackbar>
                </Box>
            </Container>
        </>
    );
};

export default AddFlashcard;
