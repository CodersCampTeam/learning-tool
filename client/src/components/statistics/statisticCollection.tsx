import { Container, IconButton } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import { AddCircle, ArrowForward, Assessment, BuildOutlined, FeaturedPlayListOutlined } from '@material-ui/icons';
import { StyledGrid } from './styles';
import { grey } from '@material-ui/core/colors';

const StatisticCollection = (): ReactElement => {
    const url = '/api/statistics/collection';

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then((json) => setData(json.data));
    }, []);

    return (
        <Container maxWidth="xs" justify-content="center">
            Statystyki dla kolekcji
            {data.map((collection) => (
                <StyledGrid>
                    {collection['_id']}
                </StyledGrid>
            ))}
        </Container>
    );
};

export default StatisticCollection;
