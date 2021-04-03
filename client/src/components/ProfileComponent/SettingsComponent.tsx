import axios from 'axios';
import React, { ReactElement, useState, useContext } from 'react';
import { Grid, Typography, Button, Box, Switch, FormControlLabel, Checkbox } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import { useHistory } from 'react-router-dom';
import ProfileInputFields from './ProfileInputFields';
import FormGroup from '@material-ui/core/FormGroup';
import { SettingsContext, ISettingsContext } from '../../views/ProfileView';

//{ isActive, sessionHarmonogram }: SettingsComponentProps
const SettingsComponent = (): ReactElement => {
    const url = '/api/settings';

    const settinsContext = useContext<ISettingsContext>(SettingsContext);

    const history = useHistory();

    const [notificationIsActive, setNotificationIsActive] = useState(settinsContext.isActive);

    const [daysState, setDaysState] = useState([
        {
            label: 'poniedziałki',
            dayNumber: '1',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('1')
        },
        {
            label: 'wtorki',
            dayNumber: '2',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('2')
        },
        {
            label: 'środy',
            dayNumber: '3',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('3')
        },
        {
            label: 'czwartki',
            dayNumber: '4',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('4')
        },
        {
            label: 'piątki',
            dayNumber: '5',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('5')
        },
        {
            label: 'soboty',
            dayNumber: '6',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('6')
        },
        {
            label: 'niedziele',
            dayNumber: '0',
            checked: settinsContext.sessionHarmonogram && settinsContext.sessionHarmonogram.includes('0')
        }
    ]);

    const handleNotificationSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationIsActive(event.target.checked);
        settinsContext.isActive = event.target.checked;
        axios.put(`${url}/is-active`, { isActive: event.target.checked });
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
        const today = new Date(Date.now());
        daysState.map((dayObj) => {
            if (dayObj.checked) {
                // here calculate next day of notification.
                // // (this is to not store additional time zone, as client time is already in zone)
                // let nextDate: Date;
                // if (today.getDay() > dayObj.dayNumber) {
                //     nextDate = today;
                //     const days = 7 - today.getDay() + dayObj.dayNumber;
                //     nextDate.setDate(today.getDate() + days);
                // } else if (today.getDay() < dayObj.dayNumber) {
                //     nextDate = today;
                //     const days = dayObj.dayNumber - nextDate.getDay();
                //     nextDate.setDate(today.getDate() + days);
                // } else {
                //     nextDate = today;
                //     nextDate.setDate(today.getDate() + 7);
                // }
                // sessionHarmonogram.push(nextDate.toString());

                sessionHarmonogram.push(dayObj.dayNumber);
            }
        });
        settinsContext.sessionHarmonogram = sessionHarmonogram;
        console.log(settinsContext.sessionHarmonogram);
        axios.put(`${url}/harmonogram`, { harmonogram: sessionHarmonogram }).then((json) => console.log(json));
    };

    const handleLogout = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `jwt= ; expires= ${date.getUTCDate()}; path=/`;
        history.push('/');
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
                                                color="secondary"
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
                                endIcon={<DoneOutlineIcon />}
                                onClick={handleSaveClicked}
                            >
                                Zapisz
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
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
                                color="secondary"
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
                style={{ margin: 'auto', display: 'flex' }}
            >
                Wyloguj się
            </Button>
        </>
    );
};
export default SettingsComponent;
