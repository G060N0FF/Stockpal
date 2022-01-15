import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RingLoader from "react-spinners/RingLoader";

import "../css/Chart.component.css";

export default class ChartComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({ loaded: false });

        fetch('/api/stock/')
        .then(res => res.json())
        .then(json => this.setState({ data: json.data, min: json.min, max: json.max, name: json.name, loaded: true }));
    }

    render() {
        const { data, min, max, name } = this.state;

        return (
            <div className="chart-component">
                {
                    this.state.loaded
                    ?
                    <div className='chart'>
                        <h3 className='chart-stock-name'>{name}</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="Date" axisLine={false} tick={false} />
                                <YAxis domain={[min, max]} axisLine={false} tick={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="Value" stroke="#2234a8" fill="#f0f8fe" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    : 
                    <div className="chart">
                        <RingLoader />
                    </div>
                }
            </div>
        );
    }
}
