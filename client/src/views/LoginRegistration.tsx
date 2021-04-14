import React, { ReactElement } from 'react';
import TabComponent from '../components/Tabs/TabComponent';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Login from './Login/Login';
import Register from './Register/Register';

const LoginRegistration = ({ isLogin }: { isLogin: boolean }): ReactElement => {
    return (
        <>
            <TabComponent
                initial={isLogin ? 0 : 1}
                iconLeft={<EmojiObjectsIcon />}
                labelLeft={'Logowanie'}
                iconRight={<HowToRegIcon />}
                labelRight={'Rejestracja'}
            >
                <Login />
                <Register />
            </TabComponent>
        </>
    );
};
export default LoginRegistration;
