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
import { IconRow, AvatarRow } from './styles';

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
            <Box mt={3}>
                <h3>Odkrywaj publiczne kolekcje fiszek</h3>
            </Box>
            {state.length ? (
                state.map((collection: any, index: number) => (
                    <StyledGrid key={index}>
                        <CollectionHeader>{collection.name}</CollectionHeader>
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={0}>
                            <Box mr={4}>
                                <IconButton edge="start">
                                    <FeaturedPlayListOutlined />
                                </IconButton>
                                Fiszki: {collection.flashcards.length}
                            </Box>
                            <IconButton edge="end">
                                <ArrowForward color="secondary" />
                            </IconButton>
                        </Grid>
                        <AvatarRow>
                            <div>
                                {' '}
                                <IconButton>
                                    <AccountCircleIcon />
                                </IconButton>
                                {collection.owner}
                            </div>
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
                        <Box mt={4}>
                            <Typography variant="h3" align="center">
                                Przykro nam! <br /> Nie ma kolekcji o podanym tagu.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={4}>
                            <img width="240px" alt="Artystyczna wizja poszukiwania" src="/searching.svg" />
                        </Box>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default SearchResultsComponent;
