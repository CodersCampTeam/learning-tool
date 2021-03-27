import { NavLink } from 'react-router-dom';

export const NavBar = () => {
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
