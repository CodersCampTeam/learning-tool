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
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block'
            }
        }
    })
);

export const TopNavBar: FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <AppBar position="static">
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
