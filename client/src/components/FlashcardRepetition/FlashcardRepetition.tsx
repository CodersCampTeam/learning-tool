import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { IconButton } from '@material-ui/core';
import { CancelOutlined, ContactSupportOutlined, CheckCircleOutline } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const StyledCard = styled(Card)`
    min-height: 20em;
    max-width: 30em;
    margin: auto;
    display: flex;
    justify-content: center;
    padding: 2em;

    & * {
        margin-bottom: 1em;
    }

    & > h6:first-of-type {
        margin: 0;
        padding: 0;
    }
`;

interface IFlashcard {
    prompt: string;
    imageUrl: string;
    answers: string[];
    extraInfo: string;
    collectionId: string;
    isQuizQuestion: boolean;
    correctAnswer: number;
}

export const FlashcardRepetition = () => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState({
        question: 'Loading...',
        questionNumber: 0,
        questionAnswer: 'Loading...',
        extraInfo: ''
    });
    const [showAnswer, setShowAnswer] = useState(false);

    //Switches
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    // const [quizMode, setQuizMode] = useState(false);

    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

    useEffect(() => {
        axios
            .get(`/api/flashcard-collection/${id}`, { withCredentials: true })
            .then((res) => {
                setFlashcards(res.data.flashcards);
                setQuestion({
                    question: res.data.flashcards[0].prompt,
                    questionNumber: 1,
                    questionAnswer: res.data.flashcards[0].answers[res.data.flashcards[0].correctAnswer],
                    extraInfo: res.data.flashcards[0].extraInfo
                });
            })
            .catch();
    }, []);

    const handleNotKnown = () => {
        loadNextFlashcard();
    };
    const handleKnown = () => {
        loadNextFlashcard();
    };

    const loadNextFlashcard = () => {
        const currQuestionNumber = question.questionNumber; // Already + 1
        if (currQuestionNumber < flashcards.length) {
            setShowAnswer(false);
            setQuestion({
                question: flashcards[currQuestionNumber].prompt,
                questionNumber: currQuestionNumber + 1,
                questionAnswer: flashcards[currQuestionNumber].answers[flashcards[currQuestionNumber].correctAnswer],
                extraInfo: flashcards[currQuestionNumber].extraInfo
            });
        }
    };

    return (
        <>
            <Grid item xs={12} style={{ margin: '1em' }}>
                <Grid container justify="flex-end" alignItems="center" style={{ gridGap: '3em' }}>
                    {/* <FormControlLabel
                        value="bottom"
                        control={
                            <Switch
                                checked={quizMode}
                                onChange={(event) => setQuizMode(event.target.checked)}
                                color="primary"
                                aria-label="tryb quizu"
                            />
                        }
                        label="tryb quizu"
                        labelPlacement="end"
                    /> */}
                    <FormControlLabel
                        value="bottom"
                        control={
                            <Switch
                                checked={showExtraInfo}
                                onChange={(event) => setShowExtraInfo(event.target.checked)}
                                color="primary"
                                aria-label="Pokaż dodatkowe info"
                            />
                        }
                        label="Pokaż dodatkowe info"
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>

            <Typography color="textSecondary" variant="subtitle2" align="center">
                {question.questionNumber} / {flashcards.length || 0}
            </Typography>
            <div style={{ padding: '1em' }}>
                <StyledCard elevation={3}>
                    <CardContent>
                        <Typography variant="h5" component="h2" align="center">
                            {question.question}
                        </Typography>
                        {showExtraInfo && question.extraInfo.length > 0 && (
                            <Typography variant="caption" component="p" align="center">
                                {question.extraInfo}
                            </Typography>
                        )}
                        {showAnswer && (
                            <Typography variant="body1" component="p" align="center">
                                {question.questionAnswer}
                            </Typography>
                        )}
                    </CardContent>
                </StyledCard>
            </div>
            <Grid item xs={12} style={{ margin: '1em' }}>
                <Grid container justify="center" alignItems="center" style={{ gridGap: '3em' }}>
                    <IconButton onClick={handleNotKnown}>
                        <CancelOutlined style={{ fontSize: 42 }} />
                    </IconButton>
                    <IconButton onClick={() => setShowAnswer(true)}>
                        <ContactSupportOutlined style={{ fontSize: 42 }} />
                    </IconButton>
                    <IconButton onClick={handleKnown}>
                        <CheckCircleOutline style={{ fontSize: 42 }} />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};
