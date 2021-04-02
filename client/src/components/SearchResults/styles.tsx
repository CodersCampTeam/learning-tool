import styled from '@emotion/styled';

export const IconRow = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: flex-start;
`;

export const AvatarRow = styled.div`
    display: flex;
    justify-items: flex-start;
    align-items: flex-start;
    width: 100%;
    padding-left: 2.5em;
    padding-bottom: 0.1em;
    & svg {
        margin-right: 0.4em;
    }
`;

export const CollectionDetails = styled.div`
    margin-top: 0.6em;
    display: flex;
    justify-items: flex-start;
    align-items: flex-start;
    width: 60%;
    padding-left: 1.4em;
    & svg {
        margin-right: 0.4em;
    }
`;

export const NoResults = styled.div`
    display: flex;
    justify-items: center;
    width: 100%;
`;
