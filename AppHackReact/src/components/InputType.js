import React from "react";

class InputType extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue(e, name) {
        this.props.handleMapChildValue(this.props.name, {
            [name]: e.target.value,
        });
    }

    render() {
        const { title, name, value } = this.props;
        return (
            <div className="input-type">
                <label>{title}:</label>
                <div>
                    <label>Selector</label>
                    <input
                        onChange={(e) => this.handleChangeValue(e, "selector")}
                        name={name}
                        value={value.selector}
                        placeholder="Selector. Example: #app"
                    />
                </div>
                <div>
                    <label>Value</label>
                    <input
                        onChange={(e) => this.handleChangeValue(e, "value")}
                        name={name}
                        value={value.value}
                        placeholder="Value. Example: any"
                    />
                </div>
            </div>
        );
    }
}

export default InputType;
