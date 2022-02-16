import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import "../css/Chart.component.css";

export default class ChartComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.getForPeriod = this.getForPeriod.bind(this);
    }

    componentDidMount() {
        // component is still loading
        this.setState({ loaded: false });

        // fetch stock data
        fetch(`/api/stock/${this.props.symbol}/`)
        .then(res => res.json())
        .then(json => this.setState({ data: json.data, min: json.min, max: json.max, name: json.name, data_found: json.data_found, loaded: true }));

        // // load the names of the companies separately (because the fetching is too slow)
        // fetch(`/api/stock/${this.props.symbol}/name/`)
        // .then(res => res.json())
        // .then(json => this.setState({ name: json.name }));
    }

    getForPeriod(event) {
        // component is still loading
        this.setState({ loaded: false });

        // fetch stock data by period
        fetch(`/api/stock/${this.props.symbol}/${event.target.value}`)
        .then(res => res.json())
        .then(json => this.setState({ data: json.data, min: json.min, max: json.max, name: json.name, data_found: json.data_found, loaded: true}));
    }

    render() {
        const { data, min, max, name, data_found } = this.state;

        return (
            <div className="chart-component">
                {
                    this.state.loaded
                    // if the data is loaded display it
                    ?
                    <div className='chart'>
                        <h2 className='chart-stock-name'>{name}</h2>
                        <div className='chart-period-options'>
                            <button value="1d" onClick={this.getForPeriod} className='first-period-button'>1d</button>
                            <button value="5d" onClick={this.getForPeriod}>5d</button>
                            <button value="1mo" onClick={this.getForPeriod}>1mo</button>
                            <button value="3mo" onClick={this.getForPeriod}>3mo</button>
                            <button value="1y" onClick={this.getForPeriod} className='last-period-button'>1y</button>
                        </div>
                        {
                            data_found
                            // if data was loaded successfully
                            ?
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis width={0} dataKey="Date" axisLine={false} tick={false} />
                                    <YAxis width={0} domain={[min, max]} axisLine={false} tick={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Value" stroke="#2234a8" fill="#f0f8fe" />
                                </AreaChart>
                            </ResponsiveContainer>
                            // if no data was found
                            :
                            <h3 className="no-data-error">The stock symbol exists, but no data for it could be fetched.</h3>
                        }
                    </div>
                    // if the data is not loaded display the loader
                    : 
                    <div className="chart">
                        <ClimbingBoxLoader />
                    </div>
                }
            </div>
        );
    }
}
