import React, { ReactElement } from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CheckIcon from '@material-ui/icons/Check';
import Typed from 'react-typed';
import { AppName, Button, Typography, SwappedQ, SwappedI } from './styles';
import { Link } from 'react-router-dom';

const WelcomeScreen = (): ReactElement => {
    const benefits = ['nauka z fiszkami', 'skuteczne powtórki', 'przypomnienia', 'społeczność', 'bez opłat'];

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
                <Grid item xs={12} style={{ minHeight: '100px' }}>
                    <Typography variant="h2" color="textPrimary" align="center" mt={2}>
                        <Typed strings={['BUDUJEMY WIEDZĘ.']} typeSpeed={40} showCursor={false} />
                    </Typography>
                    <Typography variant="h2" color="textSecondary">
                        <Typed strings={['TWORZYMY RELACJE']} typeSpeed={40} startDelay={1500} showCursor={false} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={2}>
                        <img alt="Rysunek dwóch osób dzielących się fiszkami" src="welcome_screen_image.svg" />
                    </Box>
                </Grid>
                <Grid item xs={12} spacing={0}>
                    <AppName>
                        Fisz<SwappedQ>Q</SwappedQ>
                        <SwappedI>I</SwappedI>
                    </AppName>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        {benefits.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <div style={{ margin: -25, marginTop: -10 }}>
                                            <Typography variant="body2" color="textPrimary">
                                                {item}
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} style={{ margin: '20px auto 0' }}>
                    <Link to="/logowanie">
                        <Button variant="contained" size="medium" color="primary" startIcon={<HowToRegIcon />}>
                            ROZPOCZNIJ NAUKĘ
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default WelcomeScreen;
