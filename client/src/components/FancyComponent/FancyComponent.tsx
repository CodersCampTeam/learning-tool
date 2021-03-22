import { Typography } from '@material-ui/core';
import React from 'react';
import StyledButton from './styles';

const FancyComponent = () => {
	return (
		<React.Fragment>
			<StyledButton test color="primary">
				Click me!
			</StyledButton>
			<StyledButton color="secondary">Do not clik me!</StyledButton>
			<Typography variant="h3">Custom header</Typography>
		</React.Fragment>
	);
};

export default FancyComponent;
