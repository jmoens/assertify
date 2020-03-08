import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Styles.css'

class Navbar extends Component {
    state ={

    }
    render() {
        return (
            <div>
                <nav className="nav-wrapper deep-purple lighten-1 list">
                    <div className="container">
                        <ul className="right">
                            <li ><Link to="/" className="list">Home</Link></li>
                            <li className="list"><NavLink to="/translator" className="list">TextBox</NavLink></li>
                            <li><NavLink to="/resources" className="list">Resources</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;