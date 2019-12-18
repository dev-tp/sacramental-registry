import { Add, BarChart, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';

import './Navbar.css';

export function Navbar() {
  return (
    <nav>
      <Link className="nav-item" to="#"><Add /></Link>
      <Link className="nav-item" to="#"><BarChart /></Link>
      <div className="space"></div>
      <Link className="nav-item" to="#"><Settings /></Link>
    </nav>
  );
}

export default Navbar;
