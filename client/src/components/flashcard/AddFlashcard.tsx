import { Button, TextField, Box, Snackbar, Typography, IconButton, Grid } from '@material-ui/core';
import React, { FC, ReactElement, useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddCircle from '@material-ui/icons/AddCircle';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

const AddFlashcard: FC = (): ReactElement => {
    const [prompt, setPrompt] = useState('');
    const [promptError, setPromptError] = useState(false);
    const [answerError, setAnswerError] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswer, setIncorrectAnswer] = useState('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const { collectionId } = useParams<{ collectionId: string }>();

    interface Flashcard {
        prompt: string;
        answers: string[];
        extraInfo?: string;
        collectionId: string;
        isQuizQuestion: boolean;
        correctAnswer: number;
    }

    const saveFlashcard = () => {
        if (!prompt) {
            setPromptError(true);
            return;
        }
        if (!answers) {
            setAnswerError(true);
            return;
        }
        let allAnswers = [];
        if (incorrectAnswer) {
            allAnswers = [correctAnswer, ...answers, incorrectAnswer];
        } else {
            allAnswers = [correctAnswer, ...answers];
        }
        const flashcard: Flashcard = {
            prompt: prompt,
            answers: allAnswers,
            correctAnswer: 0,
            isQuizQuestion: answers.length > 0 ? true : false,
            collectionId: collectionId,
            extraInfo: extraInfo || undefined
        };

        axios
            .put(`/api/flashcard/${flashcard.collectionId}`, flashcard, { withCredentials: true })
            .then((response) => {
                setOpenSuccessAlert(true);
                setPrompt('');
                setCorrectAnswer('');
                setAnswers([]);
                setExtraInfo('');
                setIncorrectAnswer('');
            })
            .catch((error) => {
                setOpenErrorAlert(true);
                throw error;
            });
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
        setCorrectAnswer(value);
    };

    const handleIncorrectAnswer = () => {
        if (!incorrectAnswer) return;
        setAnswers([...answers, incorrectAnswer]);
        setIncorrectAnswer('');
    };

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Box m={4} textAlign="center">
                        <Typography variant="h2">TWORZENIE FISZKI</Typography>
                    </Box>
                    <Box m={4}>
                        <TextField
                            value={prompt}
                            error={promptError}
                            fullWidth
                            label="Pytanie"
                            helperText="To pole jest wymagane"
                            onChange={(e) => handleSetPrompt(e.target.value)}
                        />
                    </Box>
                    <Box m={4}>
                        <TextField
                            value={correctAnswer}
                            error={answerError}
                            fullWidth
                            label="Odpowiedź"
                            helperText="To pole jest wymagane"
                            onChange={(e) => handleSetAnswer(e.target.value)}
                        />
                    </Box>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <TextField
                            value={incorrectAnswer}
                            label="Odpowiedź błędna"
                            onChange={(e) => setIncorrectAnswer(e.target.value)}
                        />
                        <IconButton onClick={handleIncorrectAnswer}>
                            <AddCircle color="primary" style={{ fontSize: 30, marginLeft: '5px' }} />
                        </IconButton>
                    </Grid>
                    <Box m={4}>
                        <TextField
                            fullWidth
                            value={extraInfo}
                            label="Dodatkowe informacje"
                            onChange={(e) => setExtraInfo(e.target.value)}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Button
                            component={Link}
                            to={`/kolekcje/${collectionId}`}
                            onClick={saveFlashcard}
                            variant="contained"
                            color="primary"
                            endIcon={<DoneOutlineIcon />}
                            style={{
                                marginBottom: 15
                            }}
                        >
                            Zapisz i zakończ
                        </Button>
                        <Button
                            onClick={saveFlashcard}
                            variant="contained"
                            color="primary"
                            endIcon={<DoneOutlineIcon />}
                            style={{
                                marginBottom: 15
                            }}
                        >
                            Dodaj kolejną fiszkę
                        </Button>
                    </Box>
                </Grid>
                <Snackbar open={openSuccessAlert} autoHideDuration={1000} onClose={() => setOpenSuccessAlert(false)}>
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
                    <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setOpenErrorAlert(false)}>
                        Wystąpił błąd!
                    </MuiAlert>
                </Snackbar>
            </Grid>
        </>
    );
};

export default AddFlashcard;
