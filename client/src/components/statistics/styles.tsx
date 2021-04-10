import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';

export const StatisticsHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-family: righteous;
	font-size: 16px;
	line-height: 150%;
	margin: 0;
`;

export const StyledGrid = styled(Grid)`
    && {
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        background-color: #f2f2f2;
        margin: 30px;
        font-family: righteous;
        align-items: center;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content: center;
        border-radius: 4px;
        padding-top: 18px;
        min-width: 282px;
        min-height: 162px;
        @media (max-width: 320px) {
            min-width: 215px;
        }
    }
`;
