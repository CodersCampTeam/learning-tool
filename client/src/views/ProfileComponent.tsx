import React, { ReactElement, useEffect, useState, createContext } from 'react';
import TabPanel from '../components/Tabs/TabPanel';
import { Tabs, Tab } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SettingsComponent from '../components/ProfileComponent/SettingsComponent';
import StatisticHeader from '../components/statistics/statisticHeader';
import axios from 'axios';

export interface ISettingsContext {
    isActive: boolean;
    hour: number;
    sessionHarmonogram: string[];
}

export const SettingsContext = createContext<ISettingsContext>({
    isActive: false,
    hour: 16,
    sessionHarmonogram: []
});

const ProfileComponent = (): ReactElement => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent<EventTarget>, value: number) => {
        setValue(value);
    };

    const [userSettings, setUserSettings] = useState<ISettingsContext>({
        isActive: false,
        hour: 16,
        sessionHarmonogram: []
    });

    useEffect(() => {
        const url = '/api/settings';
        axios.get(url).then((res) => {
            setUserSettings({
                ...userSettings,
                isActive: res.data.isActive,
                sessionHarmonogram: res.data.sessionHarmonogram
            });
        });
    }, []);

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
            >
                <Tab icon={<LocalLibraryIcon />} label={'Statystyki'} value={0} />
                <Tab icon={<SettingsIcon />} label={'Ustawienia'} value={1} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <StatisticHeader />
            </TabPanel>
            <SettingsContext.Provider value={userSettings}>
                <TabPanel value={value} index={1}>
                    {userSettings && <SettingsComponent />}
                </TabPanel>
            </SettingsContext.Provider>
        </>
    );
};
export default ProfileComponent;
