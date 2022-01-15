import React from "react";

import '../css/Browse.css';
import ChartComponent from "../components/Chart.component";

export default class Browse extends React.Component {
    render() {
        return (
            <div className="browse">
                <ChartComponent symbol="AAPL" />
            </div>
        );
    }
}
