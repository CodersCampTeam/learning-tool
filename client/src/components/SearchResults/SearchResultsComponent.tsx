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

const SearchResultsComponent = (): ReactElement => {
    const [state, setState] = useState<string[]>([]);
    const { search } = useParams<{ search: string }>();
    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/search/?search=${search || ''}`, { withCredentials: true })
            .then((json) => setState(json.data))
            .catch(() => setState([]));
    }, [search]);

    return (
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={1}>
            {state.length ? (
                state.map((collection: any, index: number) => (
                    <>
                        <Typography>Odkrywaj publiczne kolekcje fiszek</Typography>
                        <StyledGrid key={index}>
                            <CollectionHeader>{collection.name}</CollectionHeader>
                            <Grid container item xs={12} direction="row">
                                <IconButton>
                                    <FeaturedPlayListOutlined />
                                </IconButton>
                                Fiszki: {collection.flashcards.length}
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </Grid>
                            <Grid container item xs={12} direction="row">
                                <Grid container item xs={12} direction="row">
                                    <AccountCircleIcon />
                                    <Typography variant="body2">{collection.owner}</Typography>
                                </Grid>
                                <IconButton>
                                    <ThumbUpIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatIcon />
                                </IconButton>
                                <IconButton>
                                    <SaveIcon />
                                </IconButton>
                            </Grid>
                        </StyledGrid>
                    </>
                ))
            ) : (
                <>
                    <Typography>Przykro nam, nie ma kolekcji o podanym tagu.</Typography>
                    <Box mt={2}>
                        <img alt="Artystyczna wizja szukania" src="searching.svg" />
                    </Box>
                </>
            )}
        </Grid>
    );
};

export default SearchResultsComponent;
