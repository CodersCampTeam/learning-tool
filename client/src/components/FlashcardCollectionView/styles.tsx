import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';

export const StyledGrid = styled(Grid)`
    && {
 
        display: flex;
        flex-basis: auto;
        flex-direction: column;      
        background-color: #F2F2F2;        
        margin: 20px;
        font-family: righteous;
        align-items: center;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content= "center";
        border-radius: 4px ;
        padding-top: 18px;     
        width: 282px;
        height: 162px;
    }
`;
export const CollectionHeader = styled.div`
	display: flex;
	font-weight: 700;
	font-size: 16px;
	line-height: 150%;
	text-transform: uppercase;
`;

export const Settings = styled.div`
	display: flex;
	padding: 5px;
`;

export const AssessmentStyle = styled.div`
	margin-right: 22px;
	margin-left: 22px;
`;

export const CreateCollection = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: 600;
	background-color: #e0e0e0;
	font-size: 14px;
	line-height: 26px;
	text-align: center;
	letter-spacing: 0.46px;
	padding: 8px 22px;
	font-family: righteous;
	text-transform: uppercase;
	width: 282px;
	height: 45px;
	border-radius: 4px;
	margin: 20px;
`;
