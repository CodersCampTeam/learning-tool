import { Container } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import { StatisticsHeader } from './styles';

const StatisticHeader = (): ReactElement => {
    const url = '/api/statistics/header';

    const [dataCollection, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then((json) => setData(json.data));
    }, []);

    const urlHistory = '/api/statistics/headerHistory';

    const [dataHistory, setHistory] = useState([]);

    useEffect(() => {
        axios.get(urlHistory).then((json) => setHistory(json.data));
    }, []);

    return (
        <Container maxWidth="xs" justify-content="center">
            {dataCollection.length > 0 ? (
                dataCollection.map((collection) => (
                    <StatisticsHeader>
                        Własne kolekcje: {collection['mycollections']}
                        <br />
                        Fiszki: {collection['myflashcards']}
                    </StatisticsHeader>
                ))
            ) : (
                <StatisticsHeader>
                    {' '}
                    Własne kolekcje: 0 <br /> Fiszki: 0
                </StatisticsHeader>
            )}
            {dataHistory.length > 0 ? (
                dataHistory.map((history) => (
                    <StatisticsHeader>
                        Powtórzone fiszki: {history['answers']}
                        <br />
                        Sesje: {history['session']}
                    </StatisticsHeader>
                ))
            ) : (
                <StatisticsHeader>
                    {' '}
                    Powtórzone fiszki: 0 <br /> Sesjse: 0
                </StatisticsHeader>
            )}
        </Container>
    );
};

export default StatisticHeader;
