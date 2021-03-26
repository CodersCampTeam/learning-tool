import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar: FC = (): ReactElement => {
    console.log('nav bar...');
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>

            <li>
                <NavLink to="/profile">Profil</NavLink>
            </li>
        </ul>
    );
};
