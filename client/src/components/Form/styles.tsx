import styled from '@emotion/styled';
import { Button, Checkbox, TextField, Icon, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiGrid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import React from 'react';
import { css } from '@emotion/react';

interface FormStylesProps {
    isdisplay?: string;
}

export const StyledError = styled.div`
    width: 90%;
    margin-left: 5%;
    color: red;
`;

export const StyledTextField = styled(TextField)`
    && {
        width: 90%;
        margin: 1vh;

        input {
            font-size: 16px;
        }

        &.test {
            display: ${(props: FormStylesProps) =>
                props.isdisplay && props.isdisplay === 'true' ? 'inline-flex' : 'none'};
        }
    }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        ${(props: FormStylesProps) => (props.isdisplay === 'true' ? '' : 'display: none')};
        width: 90%;
        text-align: center;
        padding: 5px;
    }
`;

export const StyledForm = styled.form`
    text-align: center;
    width: 100%;
`;

export const StyledButton = styled(Button)`
    && {
        width: 90%;
        margin: 1vh;
        background-color: #2f2e41;
        text-transform: uppercase;
        color: #ffff;
        padding: 6px;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        font-family: Open Sans;
    }
`;

export const StyledLink = styled(Link)`
    && {
        text-align: right;
        float: right;
        margin-right: 10%;
        margin-top: 10px;
        color: #1976d2;
        text-decoration: none;
    }
`;

export const StyledCheckbox = styled(Checkbox)`
    && {
        margin-left: 5%;
    }
`;

export const StyledButtonGoogle = styled(Button)`
    && {
        margin-top: 1vh;
        width: 90%;
        margin: 1vh;
        font-size: 16px;
        text-align: center;
        margin-left: 5%;
        padding-top: 10.5px;
        padding-bottom: 10.5px;
        text-transform: none;
    }
`;

export const StyledParagraph = css`
    text-transform: uppercase;
    margin: 2vh;
    font-weight: 700;
    font-weight: 16px;
    text-align: center;
`;

export const Grid = styled(MuiGrid)(spacing);
