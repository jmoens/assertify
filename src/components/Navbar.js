import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
    state ={

    }
    render() {
        return (
            <div>
                <nav className="nav-wrapper deep-purple lighten-1">
                    <div className="container">
                        <ul className="right">
                            <li><Link to="/">Home</Link></li>
                            <li><NavLink to="/translator">TextBox</NavLink></li>
                            <li><NavLink to="/resources">Resources</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;