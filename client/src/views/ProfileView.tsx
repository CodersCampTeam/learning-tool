import React, { ReactElement } from 'react';
import TabComponent from '../components/Tabs/TabComponent';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SettingsComponent from '../components/ProfileComponent/SettingsComponent';

const ProfileView = (): ReactElement => {
    return (
        <>
            <TabComponent
                iconLeft={<LocalLibraryIcon />}
                labelLeft={'Statystyki'}
                iconRight={<SettingsIcon />}
                labelRight={'Ustawienia'}
            >
                <div>Treść dla statystyk</div>
                <SettingsComponent />
            </TabComponent>
        </>
    );
};
export default ProfileView;
