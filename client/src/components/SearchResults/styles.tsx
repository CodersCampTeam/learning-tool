import styled from '@emotion/styled';

import { StyledGrid, CollectionHeader } from '../FlashcardCollectionComponents/styles';

export const Header = styled(CollectionHeader)`
    line-height: 100%;
    padding-bottom: 0px;
`;

export const IconRow = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: flex-end;
`;

export const AvatarRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1%;
    width: 100%;
    padding-bottom: 0.1em;
    & svg {
        margin-right: 0.4em;
    }
`;

export const CollectionDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    & svg {
        margin-right: 0.4em;
    }
`;

export const NoResults = styled.div`
    display: flex;
    justify-items: center;
    width: 100%;
    margin-top: 20px;
`;

export const SearchStyledGrid = styled(StyledGrid)`
    && {
        justify-content: space-evenly;
        padding-top: 10px;
        min-width: 282px;
        min-height: 162px;
    }
`;
