import React from "react";

class InputWaitForSelector extends React.Component {
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
                        onChange={(e) => this.handleChangeValue(e, "value")}
                        name={name}
                        value={value.value}
                        placeholder="Selector. Example: #div"
                    />
                </div>
            </div>
        );
    }
}

export default InputWaitForSelector;
