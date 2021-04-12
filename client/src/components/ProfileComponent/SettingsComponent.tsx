import axios from 'axios';
import React, { ReactElement, useState, useContext } from 'react';
import { Grid, Typography, Button, Box, Switch, FormControlLabel, Checkbox } from '@material-ui/core';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import { useHistory } from 'react-router-dom';
import ProfileInputFields from './ProfileInputFields';
import FormGroup from '@material-ui/core/FormGroup';
import { SettingsContext, ISettingsContext } from '../../views/ProfileView';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';

const SettingsComponent = (): ReactElement => {
    const url = '/api/settings';

    const settingsContext = useContext<ISettingsContext>(SettingsContext);

    const history = useHistory();

    const [notificationIsActive, setNotificationIsActive] = useState(settingsContext.isActive);

    const [daysState, setDaysState] = useState([
        {
            label: 'poniedziałki',
            dayNumber: '1',
            checked: settingsContext.sessionHarmonogram.includes('1')
        },
        {
            label: 'wtorki',
            dayNumber: '2',
            checked: settingsContext.sessionHarmonogram.includes('2')
        },
        {
            label: 'środy',
            dayNumber: '3',
            checked: settingsContext.sessionHarmonogram.includes('3')
        },
        {
            label: 'czwartki',
            dayNumber: '4',
            checked: settingsContext.sessionHarmonogram.includes('4')
        },
        {
            label: 'piątki',
            dayNumber: '5',
            checked: settingsContext.sessionHarmonogram.includes('5')
        },
        {
            label: 'soboty',
            dayNumber: '6',
            checked: settingsContext.sessionHarmonogram.includes('6')
        },
        {
            label: 'niedziele',
            dayNumber: '0',
            checked: settingsContext.sessionHarmonogram.includes('0')
        }
    ]);

    const [open, setOpen] = React.useState(false);

    const handleNotificationSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationIsActive(event.target.checked);
        settingsContext.isActive = event.target.checked;

        // Could add input for setting hour in future. For now it is fixed to 4 PM in all time zones
        const date = new Date();
        date.setHours(16);

        axios.put(`${url}/activate`, { isActive: event.target.checked, hour: date.getUTCHours() });
    };

    const handleChange = (event: { target: { name: string; checked: boolean } }) => {
        setDaysState(
            daysState.map((dayObj) => {
                return dayObj.dayNumber === event.target.name ? { ...dayObj, checked: !dayObj.checked } : dayObj;
            })
        );
    };

    const handleSaveClicked = () => {
        const sessionHarmonogram: string[] = [];
        daysState.map((dayObj) => {
            if (dayObj.checked) {
                sessionHarmonogram.push(dayObj.dayNumber);
            }
        });
        settingsContext.sessionHarmonogram = sessionHarmonogram;
        axios.put(`${url}/harmonogram`, { harmonogram: sessionHarmonogram }).then(() => {
            setOpen(true);
        });
    };

    const handleLogout = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `jwt= ; expires= ${date.getUTCDate()}; path=/`;
        history.push('/start');
    };

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={4}>
                <Grid item xs={12}>
                    <ProfileInputFields />
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={11} sm={4}>
                        <Typography variant="h6" align="center" color="textPrimary">
                            Harmonogram powtórek
                        </Typography>
                        <Box textAlign="center" mb={4} mt={2}>
                            <FormGroup row>
                                {daysState.map((day, dayIdx) => (
                                    <FormControlLabel
                                        key={dayIdx}
                                        control={
                                            <Checkbox
                                                checked={day.checked}
                                                onChange={handleChange}
                                                name={day.dayNumber.toString()}
                                                color="primary"
                                            />
                                        }
                                        label={day.label}
                                        style={{ display: 'table' }}
                                    />
                                ))}
                            </FormGroup>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="submit"
                                endIcon={<SaveIcon />}
                                onClick={handleSaveClicked}
                            >
                                Zapisz harmonogram
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={9} sm={3}>
                    <Typography variant="subtitle1" color="textPrimary" align="left">
                        Powiadomienia e-mail
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={1}>
                    <FormControlLabel
                        value="bottom"
                        control={
                            <Switch
                                checked={notificationIsActive}
                                onChange={handleNotificationSwitch}
                                size="small"
                                color="primary"
                                aria-label="Włącz"
                            />
                        }
                        label="Włącz"
                        labelPlacement="end"
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
                style={{ margin: 'auto', display: 'flex', marginTop: '30px' }}
            >
                Wyloguj się
            </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={open}
                autoHideDuration={1500}
                onClose={() => setOpen(false)}
            >
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setOpen(false)}>
                    Pomyślnie zapisano!
                </MuiAlert>
            </Snackbar>
        </>
    );
};
export default SettingsComponent;
