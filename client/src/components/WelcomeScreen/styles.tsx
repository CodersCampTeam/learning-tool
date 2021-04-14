import styled from '@emotion/styled';
import { spacing } from '@material-ui/system';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import { keyframes } from '@emotion/react';

const SwapQ = keyframes`
0%, 20%, 80%, 100%{transform: translate(0%)}
25%{transform: translate(25%, 50%)}
30%, 70%{transform: translate(50%)}
75%{transform: translate(25%, -50%)}
`;

const SwapI = keyframes`
0%, 20%, 80%, 100%{transform: translate(0%)}
25%{transform: translate(-100%, -50%)}
30%, 70%{transform: translate(-250%)}
75%{transform: translate(-100%, 50%)}
`;

export const SwappedQ = styled.div`
    display: inline-block;
    animation: ${SwapQ} 3s infinite linear;
    animation-delay: 3s;
    color: #673ab7;
`;
export const SwappedI = styled.div`
    display: inline-block;
    animation: ${SwapI} 3s infinite linear;
    animation-delay: 3s;
    color: #673ab7;
`;

export const AppName = styled.h1`
    font-family: righteous;
    text-align: center;
    margin: 2px auto;
`;

export const Button = styled(MuiButton)(spacing);
export const Typography = styled(MuiTypography)(spacing);
