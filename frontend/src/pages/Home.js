import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import '../css/Home.css';

export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <Tilt>
                    <div className='banner'>
                        <div className='banner-shadow'></div>
                        <h1 className='banner-title'>Stockpal</h1>
                        <Link to="/browse" className='banner-option'>Browse</Link>
                        <br />
                        <br />
                        <br />
                        <Link to="#" className='banner-option'>Start trading</Link>
                    </div>
                </Tilt>
            </div>
        );
    }
}
