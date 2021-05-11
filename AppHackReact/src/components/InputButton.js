import React from "react";

class InputButton extends React.Component {
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
                        placeholder="Button. Example: #button"
                    />
                </div>
            </div>
        );
    }
}

export default InputButton;
