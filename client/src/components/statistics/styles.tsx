import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';
import { CollectionHeader } from '../FlashcardCollectionComponents/styles';

export const StatsHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: Open Sans;
    font-size: 16px;
    line-height: 150%;
    font-weight: bold;
`;

export const StyledGrid = styled(Grid)`
    && {
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        background-color: #f2f2f2;
        margin-top: 30px;
        font-family: Open Sans;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content: center;
        border-radius: 4px;
        padding-left: 20px;
        min-width: 282px;
        min-height: 192px;
        @media (max-width: 320px) {
            min-width: 260px;
        }
    }
`;
export const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StatsCollectionHeader = styled(CollectionHeader)`
    padding: 10px 0 -20;
`;
