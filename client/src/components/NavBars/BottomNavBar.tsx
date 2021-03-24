import React from 'react';
import styled from '@emotion/styled';
import { FC, ReactElement } from 'react';
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
  },
`;

export const BottomNavBar: FC = (): ReactElement => {
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
            <BottomNavigationAction label="Stwórz" icon={<AddCircleIcon />} component={Link} to="/create" />
            <BottomNavigationAction label="Czat" icon={<MessageIcon />} component={Link} to="/chat" />
            <BottomNavigationAction label="Profil" icon={<PersonIcon />} component={Link} to="/profile" />
        </StyledBottomNavigation>
    );
};
