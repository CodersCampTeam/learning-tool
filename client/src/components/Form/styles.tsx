import styled from '@emotion/styled';
import { Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiGrid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { css } from '@emotion/react';

interface FormStylesProps {
    isdisplay?: string;
}

export const StyledError = styled.div`
    width: 95%;
    margin-left: 5%;
    color: red;
    font-size: 15px;
    text-align: left;
`;

export const StyledTextField = styled(TextField)`
    && {
        width: 90%;
        margin: 1vh;

        input {
            font-size: 17px;
            font-weight: 600;
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
        width: 100%;
        text-align: left;
        padding: 5px 0;
        font-size: 14px;
        font-weight: 400;
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
        text-transform: uppercase;
        padding: 6px;
        font-size: 16px;
        font-weight: 600;
    }
`;

export const StyledLink = styled(Link)`
    && {
        text-align: right;
        float: right;
        margin-right: 5%;
        margin-top: 10px;
        color: #1976d2;
        text-decoration: none;
        font-size: 17px;
        width: 95%;
    }
`;

export const StyledCheckbox = styled(Checkbox)`
    && {
        margin-left: 4%;
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
    font-weight: 600;
    font-size: 18px;
    text-align: center;
`;

export const SettingsError = styled(StyledError)`
    margin-left: 0;
    width: 100%;
`;

export const Grid = styled(MuiGrid)(spacing);
