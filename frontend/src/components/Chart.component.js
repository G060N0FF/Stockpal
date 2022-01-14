import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class ChartComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return (
            <ResponsiveContainer width="80%" height="50%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Value" stroke="#00a7e1" fill="#00a7e1" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
