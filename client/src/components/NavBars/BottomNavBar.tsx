import React from 'react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import { Link } from 'react-router-dom';

const StyledBottomNavigation = styled(BottomNavigation)`
    && {
        background-color: #f9f9f9;
        bottom: 0;
        position: fixed;
        width: 100%;
    }
`;

export const BottomNavBar = (): ReactElement => {
    const [value, setValue] = React.useState(0);

    return (
        <StyledBottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction label="Start" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="Stwórz" icon={<AddCircleIcon />} component={Link} to="/stworz-kolekcje" />
            <BottomNavigationAction label="Czat" icon={<MessageIcon />} component={Link} to="/czat" />
            <BottomNavigationAction label="Profil" icon={<PersonIcon />} component={Link} to="/profil" />
        </StyledBottomNavigation>
    );
};
