import React from 'react';
import { Grid, Typography, Button, Box, Switch, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CheckboxLabels from './CheckboxDaysRevision';
import ProfileInputFields from './ProfileInputFields';

const SettingsComponent = () => {
    const [notification, setNotifications] = useState({
        checkedA: true,
        checkedB: true
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications({ ...notification, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={4}>
                <Grid item xs={12}>
                    <ProfileInputFields />
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={11}>
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
                <Grid item xs={9}>
                    <Typography variant="body1" color="textPrimary" align="left">
                        Powiadomienia e-mail
                    </Typography>
                </Grid>
                <Grid item xs={3}>
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
        </>
    );
};
export default SettingsComponent;
