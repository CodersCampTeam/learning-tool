import React, { ReactElement } from 'react';
import { Grid, Typography, Button, Box, Switch, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CheckboxLabels from './CheckboxDaysRevision';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import ProfileInputFields from './ProfileInputFields';

const SettingsComponent = (): ReactElement => {
    const [notification, setNotifications] = useState({
        checkedA: true,
        checkedB: true
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications({ ...notification, [event.target.name]: event.target.checked });
    };

    const handleLogout = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `jwt= ; expires= ${date.getUTCDate()}; path=/`;
        window.location.href = '/';
    };

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={4}>
                <Grid item xs={12}>
                    <ProfileInputFields />
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={11} sm={4}>
                        <Typography variant="body1" align="center" color="textPrimary">
                            Harmonogram powtórek
                        </Typography>
                        <Box textAlign="center" mb={4} mt={2}>
                            <CheckboxLabels />
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="submit"
                                startIcon={<DoneOutlineIcon />}
                            >
                                Zapisz
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={9} sm={3}>
                    <Typography variant="body1" color="textPrimary" align="left">
                        Powiadomienia e-mail
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={1}>
                    <FormControlLabel
                        value="bottom"
                        control={
                            <Switch
                                checked={notification.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="secondary"
                                edge="end"
                                aria-label="Włącz"
                                size="small"
                            />
                        }
                        label="Włącz"
                        labelPlacement="bottom"
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                endIcon={<MeetingRoom />}
                onClick={handleLogout}
                style={{ margin: 'auto', display: 'flex' }}
            >
                Wyloguj się
            </Button>
        </>
    );
};
export default SettingsComponent;
