import { useEffect, useState, ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button, IconButton } from '@material-ui/core';
import { CancelOutlined, ContactSupportOutlined, CheckCircleOutline } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';

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
    _id: string,
    prompt: string;
    imageUrl: string;
    answers: string[];
    extraInfo: string;
    collectionId: string;
    isQuizQuestion: boolean;
    correctAnswer: number;
}

export const FlashcardRepetition = (): ReactElement => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState({
        _id: '',
        question: 'Loading...',
        questionNumber: 0,
        questionAnswer: 'Loading...',
        answers: [''],
        extraInfo: '',
        isQuizQuestion: false
    });
    const [showAnswer, setShowAnswer] = useState(false);

    //Switches
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    const [quizMode, setQuizMode] = useState(false);

    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

    useEffect(() => {
        axios
            .get(`/api/flashcard-collection/${id}`, { withCredentials: true })
            .then((res) => {
                setFlashcards(res.data.flashcards);
                if (res.data.flashcards.length > 0) {
                    setQuestion({
                        _id: res.data.flashcards[0]._id,
                        question: res.data.flashcards[0].prompt,
                        questionNumber: 1,
                        questionAnswer: res.data.flashcards[0].answers[res.data.flashcards[0].correctAnswer],
                        answers: res.data.flashcards[0].answers,
                        extraInfo: res.data.flashcards[0].extraInfo,
                        isQuizQuestion: res.data.flashcards[0].isQuizQuestion
                    });
                }
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
        if (currQuestionNumber < flashcards.length && flashcards.length > 0) {
            setShowAnswer(false);
            setQuestion({
                _id: flashcards[currQuestionNumber]._id,
                question: flashcards[currQuestionNumber].prompt,
                questionNumber: currQuestionNumber + 1,
                questionAnswer: flashcards[currQuestionNumber].answers[flashcards[currQuestionNumber].correctAnswer],
                answers: flashcards[currQuestionNumber].answers,
                extraInfo: flashcards[currQuestionNumber].extraInfo,
                isQuizQuestion: flashcards[currQuestionNumber].isQuizQuestion
            });
        }
    };

    function handleKeyboardNavigation(event: { key: string }) {
        switch (event.key) {
            case 'a':
                handleNotKnown();
                break;
            case 's':
                console.log(quizMode, question.answers.length);
                if (quizMode === false || (quizMode === true && question.answers.length === 1)) setShowAnswer(true);
                break;
            case 'd':
                handleKnown();
                break;
            case 'w':
                setShowExtraInfo((showExtraInfo) => !showExtraInfo);
                break;
            case 'q':
                setQuizMode((quizMode) => !quizMode);
                break;
            default:
                break;
        }
    }

    const handleQuizAnswer = (answer: string) => {
        if (answer === question.questionAnswer) {
            handleKnown();
        } else {
            handleNotKnown();
        }
    };

    const [histID, setHistID] = useState('');
    const [user] = useState('');
    const [answers] = useState([]);

    const getHistID = async () => {
        try {
            await axios.post('/api/answer-history', {
                user,
                flashcardCollection: `${id}`,
                answers
            })
            .then((res) => {
                setHistID(res.data._id)
                })
        } catch (error) {
            console.log('getHistID', error);
        }
    };
    useEffect(() => {
        getHistID();
        console.log(histID)
    }, []);

    const saveAnswer = (answer: string, isCorrect?: boolean) => async () => {
        try {
            await axios.post('/api/answer', {
                isCorrect: isCorrect,
                flashcardId: answer

            })
            .then((res) => {
                axios.put(`/api/answer-history/${histID}`, {
                     answers: res.data._id
                 })
                });
        } catch (error) {
            console.log('saveAnswer', error);
        }
    };

    return (
        <div tabIndex={0} id="example" onKeyUp={handleKeyboardNavigation}>
            <Grid item xs={12} style={{ margin: '1em' }}>
                <Grid container justify="flex-end" alignItems="center">
                    <FormControlLabel
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
                    />
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
                            <Typography variant="subtitle2" component="p" align="center">
                                {question.extraInfo}
                            </Typography>
                        )}
                        {showAnswer && (
                            <Typography variant="h6" component="p" align="center">
                                {question.questionAnswer}
                            </Typography>
                        )}
                    </CardContent>
                </StyledCard>
            </div>
            <Grid
                item
                xs={12}
                style={{ margin: '1em', display: quizMode && question.isQuizQuestion ? 'none' : 'block' }}
            >
                <Grid container justify="center" alignItems="center" style={{ gridGap: '3em' }}>
                    <IconButton onClick={handleNotKnown}>
                        <CancelOutlined style={{ fontSize: 42, color: red[500] }} onClick={saveAnswer(question._id, false)} />
                    </IconButton>
                    <IconButton onClick={() => setShowAnswer(true)}>
                        <ContactSupportOutlined style={{ fontSize: 42, color: lightBlue[500] }} />
                    </IconButton>
                    <IconButton onClick={handleKnown}>
                            <CheckCircleOutline style={{ fontSize: 42, color: green[500] }} onClick={saveAnswer(question._id, true)}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                style={{ margin: '1em', display: quizMode && question.isQuizQuestion ? 'block' : 'none' }}
            >
                <Grid container direction="column" justify="center" alignItems="center" style={{ gridGap: '1em' }}>
                    {question.answers.map((answer) => {
                        return (
                            <Button variant="outlined" id={answer} onClick={() => handleQuizAnswer(answer)}>
                                {answer}
                            </Button>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
};
