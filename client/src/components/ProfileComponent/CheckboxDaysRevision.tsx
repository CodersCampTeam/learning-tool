import { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, Typography } from '@material-ui/core';

const CheckboxLabels = () => {
    const [state, setState] = useState([
        { label: 'poniedziałki', name: 'mon', checked: false },
        { label: 'wtorki', name: 'tue', checked: false },
        { label: 'środy', name: 'wed', checked: false },
        { label: 'czwartki', name: 'thu', checked: false },
        { label: 'piątki', name: 'fri', checked: false },
        { label: 'soboty', name: 'sat', checked: false },
        { label: 'niedziele', name: 'sun', checked: false }
    ]);

    const handleChange = (event: { target: { name: string; checked: boolean } }) => {
        setState(
            state.map((item) => {
                return item.name === event.target.name ? { ...item, checked: !item.checked } : item;
            })
        );
    };

    return (
        <FormGroup row>
            {state.map((item, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox checked={item.checked} onChange={handleChange} name={item.name} color="secondary" />
                    }
                    label={
                        <Typography variant="subtitle1" color="textSecondary">
                            {item.label}
                        </Typography>
                    }
                />
            ))}
        </FormGroup>
    );
}
export default CheckboxLabels