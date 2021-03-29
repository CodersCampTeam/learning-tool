import React, { ReactElement, useState } from 'react';
import TabPanel from './TabPanel';
import { Tabs, Tab } from '@material-ui/core';

interface ITabProps {
    initial?: number;
    children: Array<ReactElement>;
    label1: string;
    label2: string;
    icon1: ReactElement;
    icon2: ReactElement;
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
                <Tab icon={props.icon1} label={props.label1} value={0} />
                <Tab icon={props.icon2} label={props.label2} value={1} />
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
