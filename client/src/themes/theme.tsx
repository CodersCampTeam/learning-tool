import { createMuiTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette: {
		primary: green,
		secondary: deepPurple
	},
	props: {
		MuiTypography: {
			variantMapping: {
				h1: 'h2',
				h2: 'h2',
				h3: 'h3'
			}
		}
	}
});

theme.typography.h3 = {
	fontSize: '1.2rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem'
	}
};

export default theme;
