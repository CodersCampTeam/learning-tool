import { IconButton, Typography, Grid, Box } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import GradeIcon from '@material-ui/icons/Grade';
import ArrowForward from '@material-ui/icons/ArrowForward';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FeaturedPlayListOutlined from '@material-ui/icons/FeaturedPlayListOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { StyledGrid, CollectionHeader } from '../FlashcardCollectionComponents/styles';
import { IconRow, AvatarRow, CollectionDetails, NoResults } from './styles';

interface ICollection {
    name: string;
    flashcards: string[];
    owner: string;
    isSubscribed: boolean;
    subscribedUsers: string[];
    _id: string;
}

const SearchResultsComponent = (): ReactElement => {
    const [state, setState] = useState<ICollection[]>([]);
    const { search } = useParams<{ search: string }>();
    useEffect(() => {
        axios
            .get(`/api/search/?search=${search || ''}`, { withCredentials: true })
            .then((json) => setState(json.data))
            .catch(() => setState([]));
    }, [search]);

    const handleSubscribeClick = (id: string) => () => {
        axios
            .post(`/api/subscribe/`, { id }, { withCredentials: true })
            .then((json) => {
                setState(
                    state.map((el: ICollection) => {
                        if (el._id !== json.data._id) return el;
                        return { ...el, subscribedUsers: json.data.subscribedUsers, isSubscribed: true };
                    })
                );
            })
            .catch(console.log);
    };
    const handleUnsubscribeClick = (id: string) => () => {
        axios
            .delete(`/api/subscribe/${id}`, { withCredentials: true })
            .then((json) => {
                setState(
                    state.map((el: ICollection) => {
                        if (el._id !== json.data._id) return el;
                        return { ...el, subscribedUsers: json.data.subscribedUsers, isSubscribed: false };
                    })
                );
            })
            .catch(console.log);
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={2}>
            {state.length ? (
                state.map((collection: ICollection, index: number) => (
                    <StyledGrid key={index}>
                        <CollectionHeader>{collection.name}</CollectionHeader>
                        <Grid container direction="row" justify="space-around" spacing={0}>
                            <CollectionDetails>
                                <FeaturedPlayListOutlined />
                                <Typography variant="body1">Fiszki: {collection.flashcards.length}</Typography>
                            </CollectionDetails>
                            <IconButton>
                                <ArrowForward color="secondary" />
                            </IconButton>
                        </Grid>
                        <AvatarRow>
                            <AccountCircleIcon />
                            <Typography variant="body1">{collection.owner}</Typography>
                        </AvatarRow>
                        <IconRow>
                            <IconButton>
                                {collection.isSubscribed ? <GradeIcon /> : <StarBorderIcon />}
                                <Typography variant="body1">{collection.subscribedUsers.length}</Typography>
                            </IconButton>
                            <IconButton>
                                <ChatIcon />
                            </IconButton>
                            {collection.isSubscribed ? (
                                <IconButton onClick={handleUnsubscribeClick(collection._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleSubscribeClick(collection._id)}>
                                    <SaveIcon />
                                </IconButton>
                            )}
                        </IconRow>
                    </StyledGrid>
                ))
            ) : (
                <>
                    <Grid item xs={12}>
                        <NoResults>
                            <Typography variant="h3" align="center">
                                Przykro nam! <br />
                                Nie ma kolekcji o podanym tagu.
                            </Typography>
                        </NoResults>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={3}>
                            <img width="240px" alt="Artystyczna wizja poszukiwania" src="/searching.svg" />
                        </Box>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default SearchResultsComponent;
