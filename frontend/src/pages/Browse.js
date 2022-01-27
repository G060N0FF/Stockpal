import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import '../css/Browse.css';
import ChartComponent from "../components/Chart.component";

export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.fetchStocksController = new AbortController();
    }

    componentDidMount() {
        this.setState({ loaded: true, symbols: ["TSLA", "AAPL", "AMZN", "FB", "NFLX", "GOOGL", "MSFT"] });
    }

    handleChange(event) {
        // cancel previous fetch
        this.fetchStocksController.abort();
        this.fetchStocksController = new AbortController();

        // prepare for fetch
        this.setState({ loaded: false });

        // empty query
        if (!event.target.value) {
            this.setState({ loaded: true, symbols: ["TSLA", "AAPL", "AMZN", "FB", "NFLX", "GOOGL", "MSFT"] });
        }

        // find stock symbols by query
        else {
            const signal = this.fetchStocksController.signal;
            fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${event.target.value}`, {signal})
            .then(res => res.json())
            .then(json => json.map((row) => {
                return row.symbol;
            }))
            .then(symbols => this.setState({ symbols: symbols, loaded: true }));
        }
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
