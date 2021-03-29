import React, { ReactElement } from 'react';
import TabComponent from '../components/Tabs/TabComponent';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Login from './Login/Login';
import Register from './Register/Register';
import { useLocation } from 'react-router-dom';

const LoginRegistration = (): ReactElement => {
    const location = useLocation();
    const currentTab = location.pathname;
    return (
        <>
            <TabComponent
                initial={currentTab === '/login' ? 0 : 1}
                icon1={<EmojiObjectsIcon />}
                label1={'Logowanie'}
                icon2={<HowToRegIcon />}
                label2={'Rejestracja'}
            >
                <Login />
                <Register />
            </TabComponent>
        </>
    );
};
export default LoginRegistration;
