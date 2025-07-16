import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './sideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>TimeCapsule</h3>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/allCapsules" className="nav-item" activeClassName="active">
          <span className="icon"></span> My Capsules
        </NavLink>
        <NavLink to="/createCapsule" className="nav-item" activeClassName="active">
          <span className="icon"></span> Create Capsule
        </NavLink>
        <NavLink to="/publicWall" className="nav-item" activeClassName="active">
          <span className="icon"></span> Public Wall
        </NavLink>
        

      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="nav-item">
          <span className="icon"></span> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;