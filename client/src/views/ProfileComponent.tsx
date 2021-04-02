import React, { ReactElement, useState } from 'react';
import TabPanel from '../components/Tabs/TabPanel';
import { Tabs, Tab } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SettingsComponent from '../components/ProfileComponent/SettingsComponent';

const ProfileComponent = (): ReactElement => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent<EventTarget>, value: number) => {
        setValue(value);
    };
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
                Treść dla statystyk
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SettingsComponent />
            </TabPanel>
        </>
    );
};
export default ProfileComponent;
