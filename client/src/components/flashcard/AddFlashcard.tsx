import { Button, TextField, Box, Snackbar, Typography, IconButton, Grid } from '@material-ui/core';
import React, { ReactElement, useState, useEffect } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Close';
import AddCircle from '@material-ui/icons/AddCircle';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

const AddFlashcard = (): ReactElement => {
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
    const { flashcardId } = useParams<{ flashcardId: string }>();

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
                setCorrectAnswer(json.data.answers[0]);
                if (json.data.answers.length > 1) {
                    setIncorrectAnswer(json.data.answers[json.data.answers.length - 1]);
                    setAnswers(json.data.answers.slice(1, json.data.answers.length - 1));
                }
                setExtraInfo(json.data.extraInfo);
            });
        }
    }, []);

    const saveFlashcard = async () => {
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
            isQuizQuestion: allAnswers.length > 1 ? true : false,
            collectionId: collectionId,
            extraInfo: extraInfo || undefined
        };

        try {
            if (flashcardId) {
                await axios.patch(`/api/flashcard/${flashcardId}`, flashcard, {
                    withCredentials: true
                });
            } else {
                await axios.put(`/api/flashcard/${flashcard.collectionId}`, flashcard, { withCredentials: true });
            }
            setOpenSuccessAlert(true);
            setPrompt('');
            setCorrectAnswer('');
            setAnswers([]);
            setExtraInfo('');
            setIncorrectAnswer('');
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
        setCorrectAnswer(value);
    };

    const handleIncorrectAnswer = () => {
        if (!incorrectAnswer) return;
        setAnswers([...answers, incorrectAnswer]);
        setIncorrectAnswer('');
    };

    const handleDeleteAnswer = (index: number) => () => {
        setAnswers(answers.filter((el, ind) => ind !== index));
    };

    const handleIncorrectAnswerChange = (answer: string, index: number) => {
        setAnswers(
            answers.map((el, ind) => {
                if (ind !== index) return el;
                return answer;
            })
        );
    };

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" sm={12}>
                <Grid item xs={12}>
                    <Box m={4} textAlign="center">
                        <Typography variant="h2">{flashcardId ? 'EDYCJA FISZKI' : 'TWORZENIE FISZKI'}</Typography>
                    </Box>
                    <Box m={4}>
                        <TextField
                            value={prompt}
                            error={promptError}
                            fullWidth
                            multiline={true}
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
                            multiline={true}
                            label="Odpowiedź"
                            helperText="To pole jest wymagane"
                            onChange={(e) => handleSetAnswer(e.target.value)}
                        />
                    </Box>

                    {answers.map((answer: string, index: number) => (
                        <Grid container direction="row" justify="space-around" alignItems="center" key={index}>
                            <TextField
                                value={answer}
                                multiline={true}
                                label="Odpowiedź błędna"
                                onChange={(e) => handleIncorrectAnswerChange(e.target.value, index)}
                            />
                            <IconButton onClick={handleDeleteAnswer(index)}>
                                <CloseIcon color="primary" style={{ fontSize: 30, marginLeft: '5px' }} />
                            </IconButton>
                        </Grid>
                    ))}
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <TextField
                            value={incorrectAnswer}
                            multiline={true}
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
                            multiline={true}
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
                        {!flashcardId && (
                            <Button
                                onClick={saveFlashcard}
                                variant="contained"
                                color="primary"
                                endIcon={<AddCircle />}
                                style={{
                                    marginBottom: 15
                                }}
                            >
                                Dodaj kolejną fiszkę
                            </Button>
                        )}
                        <Button
                            component={Link}
                            to={`/kolekcje/${collectionId}`}
                            variant="contained"
                            color="secondary"
                            endIcon={<CloseIcon />}
                            style={{
                                marginBottom: 15
                            }}
                        >
                            Wróć do kolekcji
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
