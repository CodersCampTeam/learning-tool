import { IconButton, Typography, Grid, Box } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ArrowForward from '@material-ui/icons/ArrowForward';
import SaveIcon from '@material-ui/icons/Save';
import FeaturedPlayListOutlined from '@material-ui/icons/FeaturedPlayListOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { StyledGrid, CollectionHeader } from '../FlashcardCollectionComponents/styles';
import { IconRow, AvatarRow, CollectionDetails, NoResults } from './styles';

const SearchResultsComponent = (): ReactElement => {
    const [state, setState] = useState<string[]>([]);
    const { search } = useParams<{ search: string }>();
    useEffect(() => {
        axios
            .get(`/api/search/?search=${search || ''}`, { withCredentials: true })
            .then((json) => setState(json.data))
            .catch(() => setState([]));
    }, [search]);

    return (
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={2}>
            {state.length ? (
                state.map((collection: any, index: number) => (
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
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton>
                                <ChatIcon />
                            </IconButton>
                            <IconButton>
                                <SaveIcon />
                            </IconButton>
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
