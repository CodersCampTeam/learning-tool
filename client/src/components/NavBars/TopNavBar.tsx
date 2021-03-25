import { FC, ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Search } from '../Search';
import { StyledAppName } from '../../styles/StyledAppName';
import styled from '@emotion/styled';

export const StyledDiv = styled.div`
    display: block;
    flex-grow: 1;
    padding-right: 2em;
`;

export const TopNavBar = (): ReactElement => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <StyledDiv>
                    <StyledAppName>
                        <span>Fisz</span>
                        <span>QI</span>
                    </StyledAppName>
                </StyledDiv>
                <Search />
            </Toolbar>
        </AppBar>
    );
};
