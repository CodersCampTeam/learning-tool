import React from 'react';
import { Box, Grid } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
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
}

export default TabPanel;
