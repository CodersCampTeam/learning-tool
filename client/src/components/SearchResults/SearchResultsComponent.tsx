import { IconButton, Typography, Grid, Box, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import GradeIcon from '@material-ui/icons/Grade';
import ArrowForward from '@material-ui/icons/ArrowForward';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FeaturedPlayListOutlined from '@material-ui/icons/FeaturedPlayListOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconRow, AvatarRow, CollectionDetails, NoResults, Header, SearchStyledGrid } from './styles';

interface ICollection {
    name: string;
    flashcards: string[];
    owner: string;
    isSubscribed: boolean;
    isOwned: boolean;
    subscribedUsers: string[];
    _id: string;
}

const SearchResultsComponent = (): ReactElement => {
    const [state, setState] = useState<ICollection[]>([]);
    const { search } = useParams<{ search: string }>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/search/?search=${search || ''}`, { withCredentials: true })
            .then((json) => setState(json.data))
            .catch(() => setState([]))
            .finally(() => {
                setLoading(false);
            });
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
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            )}
            {!loading && state.length
                ? state.map((collection: ICollection, index: number) => (
                      <SearchStyledGrid key={index}>
                          <Header>{collection.name}</Header>
                          <Grid container direction="column" justify="center" alignItems="center">
                              <CollectionDetails>
                                  <FeaturedPlayListOutlined color="primary" />
                                  <Typography variant="body1">Liczba fiszek: {collection.flashcards.length}</Typography>
                              </CollectionDetails>
                              <AvatarRow>
                                  <AccountCircleIcon color="primary" />
                                  <Typography variant="body1">{collection.owner}</Typography>
                              </AvatarRow>
                          </Grid>
                          <IconRow>
                              <IconButton>
                                  {collection.isSubscribed ? (
                                      <GradeIcon style={{ fontSize: 30 }} />
                                  ) : (
                                      <StarBorderIcon style={{ fontSize: 30 }} />
                                  )}
                                  <Typography variant="body1">{collection.subscribedUsers.length}</Typography>
                              </IconButton>
                              {!collection.isOwned && (collection.isSubscribed ? ( 
                                  <IconButton onClick={handleUnsubscribeClick(collection._id)}>
                                      <DeleteIcon style={{ fontSize: 30 }} />
                                  </IconButton>
                              ) : (
                                  <IconButton onClick={handleSubscribeClick(collection._id)}>
                                      <SaveIcon />
                                  </IconButton>
                              ))}
                              <IconButton component={Link} to={`/kolekcje/${collection._id}`}>
                                  <ArrowForward color="primary" style={{ fontSize: 30 }} />
                              </IconButton>
                          </IconRow>
                      </SearchStyledGrid>
                  ))
                : !loading && (
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
