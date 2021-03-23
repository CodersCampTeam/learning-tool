import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CheckIcon from '@material-ui/icons/Check';
import Typed from 'react-typed';
import { AppName, Button, Typography, SwappedQ, SwappedI } from './styles';

const benefits = ['nauka z fiszkami', 'skuteczne powtórki', 'przypomnienia', 'społeczność', 'bez opłat'];

const WelcomeScreen = () => {
    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h3" color="textPrimary" align="center" mt={8}>
                        <Typed strings={['BUDUJEMY WIEDZĘ.']} typeSpeed={40} showCursor={false} />
                    </Typography>
                    <Typography variant="h3" color="textSecondary" align="center">
                        <Typed strings={['TWORZYMY RELACJE']} typeSpeed={40} startDelay={1500} showCursor={false} />
                    </Typography>
                    <Box mt={6}>
                        <img alt="drawing of two people sharing cards" src="welcome_screen_image.svg" />
                    </Box>
                    <AppName>
                        Fisz<SwappedQ>Q</SwappedQ>
                        <SwappedI>I</SwappedI>
                    </AppName>
                    <List>
                        {benefits.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{ margin: -25, marginTop: -10 }}>{item}</div>} />
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" size="medium" color="primary" startIcon={<HowToRegIcon />} mt={2}>
                        ROZPOCZNIJ NAUKĘ
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default WelcomeScreen;
