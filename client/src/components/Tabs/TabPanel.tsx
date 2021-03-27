import React, { ReactElement } from 'react';
import { Box, Grid } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps): ReactElement => {
    return (
        <Grid
            item
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Grid>
    );
};

export default TabPanel;
