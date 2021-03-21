import React, { FC, ReactElement } from 'react'
import { NavLink } from 'react-router-dom';

export const About: FC = (): ReactElement => {

  console.log('about...')
  return (
    <div>
      About meeeeee
      <NavLink to="/">Go back to Home</NavLink>
    </div>
  );
}
