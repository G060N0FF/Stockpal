import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <Tilt
                    className="parallax-effect-glare-scale"
                    perspective={500}
                    glareEnable={true}
                    glareMaxOpacity={0.45}
                    scale={1.02}
                >
                    <div className='banner'>
                        <div className='banner-shadow'></div>
                        <h1 className='banner-title'>Stonks</h1>
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
