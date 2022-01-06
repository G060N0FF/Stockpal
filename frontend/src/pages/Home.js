import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <Tilt>
                    <div className='banner'>
                        <div className='banner-shadow'></div>
                        <h1 className='banner-title'>Stonks</h1>
                        <Link to="#" className='banner-option'>Browse</Link>
                        <br />
                        <Link to="#" className='banner-option'>Start trading</Link>
                    </div>
                </Tilt>
            </div>
        );
    }
}
