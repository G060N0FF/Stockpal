import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <Link to='/'>
                    <div className='logo'>
                        <h2 className='logo-text'>Stonks</h2>
                    </div>
                </Link>
            </div>
        );
    }
}
