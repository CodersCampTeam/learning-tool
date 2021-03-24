import { Button, TextField, Box } from '@material-ui/core';
import React, { FC, ReactElement, useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const AddFlashcard: FC = (): ReactElement => {
    const [prompt, setPrompt] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [hint, setHint] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [isError, setIsError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    interface Flashcard {
        prompt: string;
        answers: string[];
        extraInfo: string;
        collectionId: string;
        isQuizQuestion: boolean;
        correctAnswer: number;
    }

    const addAnswer = (answer: string) => {
        console.log('adding answer: ', answer);
        setAnswers([...answers, answer]);
        console.log('all answers: ', answers);
    };

    const saveFlashcard = (selectedCollectionId: string) => {
        console.log('saving flashcard...');

        const flashcard: Flashcard = {
            prompt: prompt,
            correctAnswer: correctAnswer,
            isQuizQuestion: answers.length > 1 ? true : false,
            collectionId: '607164558d64f830a7df04a0', // TODO flashcard collection id - dodać z URLa lub headera
            answers: answers,
            extraInfo: extraInfo
        };

        axios('/api/flashcard/' + flashcard.collectionId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            data: flashcard
        })
            .then((response) => (window.location.href = `/`))
            .catch((error) => {
                throw error;
            });
    };

    return (
        <>
            {redirect && <Redirect to="/flashcardCollections" />}
            <Container maxWidth="sm">
                <Box m={4} textAlign="center">
                    <h1>Tworzenie Fiszki</h1>
                </Box>
                <Box m={4}>
                    <TextField
                        error={isError} // TODO jak to ustawic?
                        fullWidth
                        label="Pytanie"
                        helperText="To pole jest wymagane"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </Box>
                <Box m={4}>
                    <TextField
                        error={isError}
                        fullWidth
                        label="Odpowiedź"
                        helperText="To pole jest wymagane"
                        onChange={(e) => addAnswer(e.target.value)}
                    />
                </Box>
                <Box m={4}>
                    <TextField fullWidth label="Podpowiedź" onChange={(e) => setHint(e.target.value)} />
                </Box>
                <Box m={4}>
                    <TextField fullWidth label="Dodatkowe informacje" onChange={(e) => setExtraInfo(e.target.value)} />
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
                </Box>
            </Container>
        </>
    );
};

export default AddFlashcard;
