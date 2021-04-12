import { Container, IconButton, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import { AddCircle, ArrowForward, Assessment, BuildOutlined, FeaturedPlayListOutlined } from '@material-ui/icons';
import { StyledGrid, CollectionHeader, Settings, AssessmentStyle, CreateCollection, RowDiv } from './styles';
import { grey } from '@material-ui/core/colors';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

interface ICollection {
    name: string;
    flashcards: string[];
    isOwned: boolean;
    _id: string;
    subscribedUsers: number;
}

const CollectionView = (): ReactElement => {
    const url = '/api/flashcard-collection';

    const [data, setData] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get(url).then((json) => setData(json.data || []));
    }, []);

    const handleUnsubscribeClick = (id: string) => () => {
        axios
            .delete(`/api/subscribe/${id}`, { withCredentials: true })
            .then(() => {
                setData(data.filter((el: ICollection) => el._id !== id));
            })
            .catch(console.log);
    };

    const handleLearn = (id: string) => () => {
        history.push(`/powtorka/${id}`);
    };

    return (
        <Container maxWidth="xs" justify-content="center">
            <Link to="/stworz-kolekcje">
                <CreateCollection>
                    <div style={{ margin: '0 auto', color: grey[800] }}>Stwórz nową kolekcję</div>
                    <IconButton>
                        <AddCircle style={{ fontSize: 30, color: grey[800] }} />
                    </IconButton>
                </CreateCollection>
            </Link>
            {data.map((collection: ICollection) => (
                <StyledGrid key={collection._id}>
                    <CollectionHeader>{collection.name}</CollectionHeader>
                    <Grid container direction="row" justify="center" alignItems="baseline">
                        <RowDiv>
                            <FeaturedPlayListOutlined style={{ fontSize: 20, color: grey[800] }} />
                            <Typography variant="body1" display="inline">
                                Fiszki: {collection.flashcards}
                            </Typography>
                        </RowDiv>
                        <RowDiv>
                            {collection.isOwned ? (
                                <StarBorderIcon style={{ fontSize: 20, color: grey[800] }} />
                            ) : (
                                <GradeIcon style={{ fontSize: 20, color: grey[800] }} />
                            )}
                            <Typography variant="body1" display="inline">
                                {collection.subscribedUsers}
                            </Typography>
                        </RowDiv>
                    </Grid>
                    <Settings>
                        {collection.isOwned ? (
                            <Link to={`/kolekcje/${collection._id}`}>
                                <IconButton>
                                    <BuildOutlined fontSize="large" style={{ color: grey[700], fontSize: 42 }} />
                                </IconButton>
                            </Link>
                        ) : (
                            <IconButton onClick={handleUnsubscribeClick(collection._id)}>
                                <DeleteIcon fontSize="large" style={{ color: grey[700], fontSize: 42 }} />
                            </IconButton>
                        )}
                        <AssessmentStyle>
                            <IconButton>
                                <Assessment fontSize="large" style={{ color: grey[700], fontSize: 42 }} />
                            </IconButton>
                        </AssessmentStyle>
                        <IconButton onClick={handleLearn(collection._id)}>
                            <ArrowForward style={{ fontSize: 42, color: grey[700] }} />
                        </IconButton>
                    </Settings>
                </StyledGrid>
            ))}
        </Container>
    );
};

export default CollectionView;
