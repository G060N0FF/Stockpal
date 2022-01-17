import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import '../css/Browse.css';
import ChartComponent from "../components/Chart.component";

export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ loaded: true, symbols: ["TSLA", "AAPL", "AMZN", "FB", "NFLX", "GOOGL", "MSFT"] });
        console.log(this);
    }

    handleChange(event) {
        this.setState({ loaded: false });

        // find stock symbols by query
        fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${event.target.value}`)
        .then(res => res.json())
        .then(json => json.map((row) => {
            return row.symbol;
        }))
        .then(symbols => this.setState({ symbols: symbols, loaded: true }));
    }

    render() {
        return (
            <div className="browse">
                <input type="text" onChange={this.handleChange} />
                {
                    this.state.loaded
                    ? (
                        this.state.symbols.map((symbol) => {
                            return <ChartComponent symbol={symbol} />;
                        })
                    )
                    : <ClimbingBoxLoader />
                }
            </div>
        );
    }
}
