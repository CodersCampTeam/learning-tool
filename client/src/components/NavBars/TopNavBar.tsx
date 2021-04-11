import { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Search } from '../Search';
import { StyledAppName } from '../../styles/StyledAppName';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledDiv = styled.div`
    display: block;
    flex-grow: 1;
`;

export const TopNavBar = (): ReactElement => {
    return (
        <AppBar position="sticky" style={{ marginBottom: '1em' }}>
            <Toolbar>
                <StyledDiv>
                    <StyledAppName>
                        <Link to="/">
                            <span>Fisz</span>
                            <span>QI</span>
                        </Link>
                    </StyledAppName>
                </StyledDiv>
                <Search />
            </Toolbar>
        </AppBar>
    );
};
