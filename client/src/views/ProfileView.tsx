import React, { ReactElement, useState, useEffect, createContext } from 'react';
import TabComponent from '../components/Tabs/TabComponent';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SettingsComponent from '../components/ProfileComponent/SettingsComponent';
import axios from 'axios';

export interface ISettingsContext {
    isActive?: boolean;
    sessionHarmonogram?: string[];
}

export const SettingsContext = createContext<ISettingsContext>({
    isActive: false,
    sessionHarmonogram: []
});

const ProfileView = (): ReactElement => {
    const [userSettings, setUserSettings] = useState({
        isActive: false,
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
        <SettingsContext.Provider value={userSettings}>
            <TabComponent
                iconLeft={<LocalLibraryIcon />}
                labelLeft={'Statystyki'}
                iconRight={<SettingsIcon />}
                labelRight={'Ustawienia'}
            >
                <div>Treść dla statystyk</div>
                {userSettings && <SettingsComponent />}
            </TabComponent>
        </SettingsContext.Provider>
    );
};
export default ProfileView;
