import React from "react";

export default class AsyncComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: "c",
            },
        };
    }

    async componentDidMount() {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    }

    handleClick = () => {
        this.setState({
            item: null,
        });
    };

    render() {
        return (
            <>
                <div>AsyncComponent</div>
                {this.state.item.name}
                <button onClick={this.handleClick}>Xin chào</button>
            </>
        );
    }
}
