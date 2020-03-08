import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../App.css";
import image from '../lightLogo.png'
import './Styles.css'

class Navbar extends Component {
    state ={

    }
    render() {
        return (
            <div>
                <nav className="nav-wrapper mediumGold">
                    <div className="toolbarContainer ">
                    <img className="logo" src={image} alt="assertify"></img>
                        <ul className="right">
                            <li><Link className="linkTitle" to="/">Home</Link></li>
                            <li><NavLink className="linkTitle" to="/translator">Translator</NavLink></li>
                            <li><NavLink className="linkTitle" to="/resources">Resources</NavLink></li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;