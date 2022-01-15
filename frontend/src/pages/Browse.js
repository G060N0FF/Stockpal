import React from "react";

import '../css/Browse.css';
import ChartComponent from "../components/Chart.component";

export default class Browse extends React.Component {
    render() {
        return (
            <div className="browse">
                <h1>Browse stock prices</h1>
                <ChartComponent />
            </div>
        );
    }
}
