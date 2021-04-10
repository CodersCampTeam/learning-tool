import { Container, IconButton, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
import {
	AddCircle,
	ArrowForward,
	Assessment,
	BuildOutlined,
	FeaturedPlayListOutlined,
	RoundedCornerTwoTone
} from '@material-ui/icons';
import { StyledGrid, RowDiv } from './styles';
import { CollectionHeader } from '../FlashcardCollectionComponents/styles';
import { grey } from '@material-ui/core/colors';

const StatisticCollection = (): ReactElement => {
	const url = '/api/statistics/collection';

	const [ data, setData ] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => setData(json.data));
	}, []);

	interface ICollection {
		CollectionName: string,
		flashcards: number,
		isOwned: boolean,
		correctAnswers: any,
		maxDate: string[]
	}

	return (
		<Container maxWidth="xs" justify-content="center">
			<CollectionHeader> Statystyki dla kolekcji</CollectionHeader>
			{data.length > 0 ? (
				data.map((collection) => (
					<StyledGrid>
						<CollectionHeader>{collection['CollectionName']}</CollectionHeader>
						<RowDiv>
							<FeaturedPlayListOutlined style={{ fontSize: 25, color: grey[800], marginRight: 10 }} />
							<Typography display="inline" variant="body2">
								Fiszki: {collection['flashcards']}
							</Typography>
							<IconButton>
								<ArrowForward style={{ fontSize: 30, color: grey[700], marginLeft: 80, padding: 0 }} />
							</IconButton>
						</RowDiv>
						<Typography variant="body2" display="inline" color="secondary">
							Historia odpowiedzi
						</Typography>
						<Typography variant="body2" display="inline">
							Dobre odpowiedzi: {collection['maxDate'][0]['correctAnswers']}
							<br />
							Umiesz:{' '}
							{Math.round(
								collection['maxDate'][0]['correctAnswers'] / collection['maxDate'][0]['total'] * 100
							)}{' '}
							%<br />
						</Typography>
					</StyledGrid>
				))
			) : (
				<Typography display="inline" variant="body2">
					Brak statystyk dla kolekcji
				</Typography>
			)}
		</Container>
	);
};

export default StatisticCollection;
