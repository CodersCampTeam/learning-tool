import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

const StyledIconButton = styled(IconButton)`
    padding: 0;
`;
const StyledIconButtonRoot = styled.span`
    & .MuiIconButton-root {
        padding: 6px;
    }
    width: 20%;
`;

const StyledSearchIcon = styled(SearchIcon)`
    color: #fff;
    padding-right: -20px;
`;

const StyledInputBase = styled(InputBase)`
    width: 80%;
    color: #fff;
    border-radius: 7px;
    padding-left: 1em;
    & .MuiInputBase-input {
        color: rgba(255, 255, 255, 0.9);
    }
`;

const StyledPaper = styled(Paper)`
    display: 'flex';
    alignitems: 'center';
    width: 400;
`;

const StyledMuiPaperRoot = styled.span`
    & .MuiPaper-root {
        background-color: rgba(255, 255, 255, 0.1);
        :hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    display: flex;
    justify-items: center;
`;

export const Search = (): ReactElement => {
    const [search, setSearch] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget?.value);
    };
    const history = useHistory();
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        history.push(`/search/${search}`);
    };

    return (
        <div>
            <StyledMuiPaperRoot>
                <StyledPaper elevation={0}>
                    <StyledInputBase placeholder="Szukaj..." type="text" value={search} onChange={handleSearch} />
                    <StyledIconButtonRoot>
                        <StyledIconButton aria-label="search" onClick={handleClick}>
                            <StyledSearchIcon />
                        </StyledIconButton>
                    </StyledIconButtonRoot>
                </StyledPaper>
            </StyledMuiPaperRoot>
        </div>
    );
};
