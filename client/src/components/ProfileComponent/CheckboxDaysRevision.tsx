import { useState, ReactElement } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, Typography } from '@material-ui/core';

const CheckboxLabels = (): ReactElement => {
    const [daysState, setDaysState] = useState([
        { label: 'poniedziałki', name: 'mon', checked: false },
        { label: 'wtorki', name: 'tue', checked: false },
        { label: 'środy', name: 'wed', checked: false },
        { label: 'czwartki', name: 'thu', checked: false },
        { label: 'piątki', name: 'fri', checked: false },
        { label: 'soboty', name: 'sat', checked: false },
        { label: 'niedziele', name: 'sun', checked: false }
    ]);

    const handleChange = (event: { target: { name: string; checked: boolean } }) => {
        setDaysState(
            daysState.map((day) => {
                return day.name === event.target.name ? { ...day, checked: !day.checked } : day;
            })
        );
    };

    return (
        <FormGroup row>
            {daysState.map((day, dayIdx) => (
                <FormControlLabel
                    key={dayIdx}
                    control={
                        <Checkbox checked={day.checked} onChange={handleChange} name={day.name} color="secondary" />
                    }
                    label={day.label}
                    style={{ display: 'table' }}
                />
            ))}
        </FormGroup>
    );
};
export default CheckboxLabels;
