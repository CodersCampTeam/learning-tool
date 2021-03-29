import { Container, IconButton } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AddCircle, ArrowForward, Assessment, BuildOutlined, FeaturedPlayListOutlined } from '@material-ui/icons';

import { StyledGrid, CollectionHeader, Settings, AssessmentStyle, CreateCollection } from './styles';
import { grey } from '@material-ui/core/colors';

const CollectionView = () => {
	const url = '/api/flashcard-collection';

	const [ data, setData ] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => setData(json.data));
	}, []);

	return (
		<Container maxWidth="xs" justify-content="center">
			<CreateCollection>
				<div>Stwórz nową kolekcję</div>
				<IconButton>
					<AddCircle style={{ fontSize: 30, color: grey[800] }} />
				</IconButton>
			</CreateCollection>
			{data.map((collection) => (
				<StyledGrid>
					<CollectionHeader>{collection['_id']}</CollectionHeader>
					<div>
						<IconButton>
							<FeaturedPlayListOutlined />
						</IconButton>
						Fiszki: {collection['flashcards']}
					</div>
					<Settings>
						<IconButton>
							<BuildOutlined fontSize="large" style={{ color: grey[700], fontSize: 42 }} />
						</IconButton>
						<AssessmentStyle>
							<IconButton>
								<Assessment fontSize="large" style={{ color: grey[700], fontSize: 42 }} />
							</IconButton>
						</AssessmentStyle>
						<IconButton>
							<ArrowForward style={{ fontSize: 42, color: grey[700] }} />
						</IconButton>
					</Settings>
				</StyledGrid>
			))}
		</Container>
	);
};

export default CollectionView;
