import { FC, ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Search } from '../Search';
import { StyledAppName } from '../../styles/StyledAppName';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            paddingRight: '2em',
            flexGrow: 1,
            display: 'block'
        }
    })
);

export const TopNavBar: FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <AppBar position="fixed">
            <Toolbar>
                <StyledAppName className={classes.title}>
                    <span>Fisz</span>
                    <span>QI</span>
                </StyledAppName>
                <Search />
            </Toolbar>
        </AppBar>
    );
};
