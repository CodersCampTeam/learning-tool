import { ReactNode } from 'react';
import StyledButton from './styles'
import {ThemeProvider, Button} from '@material-ui/core';
import theme from '../../themes/theme'

interface IProps {
    children: ReactNode
    color: any
}

const CustomButton = ({color, children}: IProps) => {
    return (
           <ThemeProvider theme={theme}>
                <StyledButton variant="contained" disableElevation>
                    {children}
                </StyledButton>
            </ThemeProvider>
    )
}

export default CustomButton;
