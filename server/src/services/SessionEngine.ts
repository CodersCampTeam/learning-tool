import { AnswerHistory } from '../models/AnswerHistory';
import _ from 'lodash';
import moongose from 'mongoose';
import { Flashcard, IFlashcard } from '../models/Flashcard';
import { Answer, IAnswer } from '../models/Answer';

const DESC_ORDER = -1;

const getRevisionList = async (collectionId: moongose.Schema.Types.ObjectId) => {
    // take all flashcards from answerHistory objects,
    // group it by flashcard, keep a list of true/false as values (isCorrect)
    // if there are more than 3 values, limit it to LAST 3
    // iterate gathered answers, if there are incorrect answers add those card ids to revision list

    const answersArrays = await AnswerHistory.find({ flashcardCollection: collectionId })
        .populate({
            path: 'answers',
            model: Answer,
            populate: {
                path: 'flashcardId',
                model: Flashcard
            }
        })
        .sort({
            sessionDate: DESC_ORDER
        });
    const allAnswers = [];
    answersArrays.map((ah) => ah.answers).forEach((answer) => answer.forEach((subEntry) => allAnswers.push(subEntry)));
    const groupedAnswersByFlashcard = groupByFlashcard(allAnswers);
    return createRevisionList(groupedAnswersByFlashcard);
};

const groupByFlashcard = (allAnswers: IAnswer[]) => {
    const result = new Map();
    allAnswers.forEach((answer) => {
        if (!result.has(answer.flashcardId)) {
            result.set(answer.flashcardId, [answer.isCorrect]);
        } else {
            if (result.get(answer.flashcardId).length < 3) {
                result.set(answer.flashcardId, [answer.isCorrect, ...result.get(answer.flashcardId)]);
            }
        }
    });
    return result;
};

const getLearningList = async (collectionId: moongose.Schema.Types.ObjectId) => {
    //part 2: learning new cards after revision
    // pick cards for learning that are not in revision

    const answersArrays = await AnswerHistory.find({ flashcardCollection: collectionId })
        .populate({
            path: 'answers',
            model: Answer,
            populate: {
                path: 'flashcardId',
                model: Flashcard
            }
        })
        .sort({
            sessionDate: DESC_ORDER
        });

    const allAnswers = [];
    answersArrays.map((ah) => ah.answers).forEach((entry) => entry.forEach((subEntry) => allAnswers.push(subEntry)));
    // console.log('all answers: ', allAnswers);
    const flashcardsUsedInRevision = getUsedFlashcards(allAnswers);
    // console.log('used in revision: ', flashcardsUsedInRevision);
    const allFlashcardsInCollection: IFlashcard[] = await Flashcard.find({ collectionId: collectionId });
    // console.log('all: ', allFlashcardsInCollection);

    const flashcardsToLearn = allFlashcardsInCollection.filter((card) => {
        const cardId = moongose.Types.ObjectId(card._id);
        return !flashcardsUsedInRevision.some((used) => moongose.Types.ObjectId(used._id).equals(cardId));
    });
    return flashcardsToLearn;
};

const getUsedFlashcards = (allAnswers: IAnswer[]) => {
    const result = [];
    allAnswers.forEach((answer) => {
        if (!result.includes(answer.flashcardId)) {
            result.push(answer.flashcardId);
        }
    });
    return result;
};

const createRevisionList = async (flashcardIdWithAnswers) => {
    const flashcardForRevision = [];
    for (const [key, value] of flashcardIdWithAnswers) {
        const wrongAnswers = value.filter((val) => !val);
        if (wrongAnswers.length > 0) {
            flashcardForRevision.push(key);
        }
    }
    return flashcardForRevision;
};

export { getRevisionList, getLearningList };
