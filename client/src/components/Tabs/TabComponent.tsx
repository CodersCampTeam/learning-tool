import React, { ReactElement, useState } from 'react';
import TabPanel from './TabPanel';
import { Tabs, Tab } from '@material-ui/core';

interface ITabProps {
    initial?: number;
    children: Array<ReactElement>;
    labelLeft: string;
    labelRight: string;
    iconLeft: ReactElement;
    iconRight: ReactElement;
}

const TabComponent = (props: ITabProps): ReactElement => {
    const [value, setValue] = useState(props.initial || 0);
    const handleChange = (event: React.SyntheticEvent<EventTarget>, value: number) => {
        setValue(value);
    };
    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
            >
                <Tab icon={props.iconLeft} label={props.labelLeft} value={0} />
                <Tab icon={props.iconRight} label={props.labelRight} value={1} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {props.children[0]}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.children[1]}
            </TabPanel>
        </>
    );
};
export default TabComponent;
