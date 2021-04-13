import { CircularProgress, Container, IconButton, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import { ArrowForward, FeaturedPlayListOutlined } from '@material-ui/icons';
import { StyledGrid, RowDiv, StatsCollectionHeader } from './styles';
import { CollectionHeader } from '../FlashcardCollectionComponents/styles';
import { Link } from 'react-router-dom';

const StatisticCollection = (): ReactElement => {
    const url = '/api/statistics/collection';

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((json) => setData(json.data))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="xs" justify-content="center">
            <CollectionHeader> Statystyki dla kolekcji</CollectionHeader>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            )}
            {!loading && data.length > 0
                ? data.map((collection, index) => (
                      <StyledGrid key={index}>
                          <StatsCollectionHeader>{collection['CollectionName']}</StatsCollectionHeader>
                          <RowDiv>
                              <FeaturedPlayListOutlined color="primary" style={{ fontSize: 25, marginRight: 10 }} />
                              <Typography display="inline" variant="body2">
                                  Fiszki: {collection['flashcards']}
                              </Typography>
                              <Link to={`/kolekcje/${collection._id.coll}`}>
                                  <IconButton>
                                      <ArrowForward
                                          color="primary"
                                          style={{ fontSize: 40, marginLeft: 90, padding: 0 }}
                                      />
                                  </IconButton>
                              </Link>
                          </RowDiv>
                          <RowDiv>
                              <Typography variant="body2" display="inline" color="primary">
                                  Historia odpowiedzi
                              </Typography>
                          </RowDiv>
                          <RowDiv>
                              <Typography variant="body2" display="inline">
                                  Dobre odpowiedzi: {collection['maxDate'][0]['correctAnswers']}{' '}
                              </Typography>
                          </RowDiv>

                          <RowDiv>
                              Umiesz:{' '}
                              {Math.round(
                                  (collection['maxDate'][0]['correctAnswers'] / collection['maxDate'][0]['total']) * 100
                              )}
                              %
                              <CircularProgress
                                  variant="determinate"
                                  color="primary"
                                  style={{ fontSize: 20, marginLeft: 80, marginBottom: 15, padding: 0 }}
                                  value={Math.round(
                                      (collection['maxDate'][0]['correctAnswers'] / collection['maxDate'][0]['total']) *
                                          100
                                  )}
                              />
                          </RowDiv>
                      </StyledGrid>
                  ))
                : !loading && (
                      <Typography display="inline" variant="body2">
                          Brak statystyk dla kolekcji
                      </Typography>
                  )}
        </Container>
    );
};

export default StatisticCollection;
