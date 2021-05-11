import React from "react";

class InputGoto extends React.Component {
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
                    <label>Url</label>
                    <input
                        onChange={(e) => this.handleChangeValue(e, "value")}
                        name={name}
                        value={value.value}
                        placeholder="Url. Example: http://localhost:3000/"
                    />
                </div>
            </div>
        );
    }
}

export default InputGoto;
