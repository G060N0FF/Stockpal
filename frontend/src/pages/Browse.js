import React from "react";

import '../css/Browse.css';
import ChartComponent from "../components/Chart.component";

export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('/stock')
        .then(res => res.json())
        .then(json => this.setState({ data: json }));
    }
    
    render() {
        const { data } = this.state;

        return (
            <div className="browse">
                <h1>Browse</h1>
                <ChartComponent data={ data } />
            </div>
        );
    }
}
