import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
        this.props.handleMapValueChildInput(this.props.name, e.target.value);
    }

    render() {
        const { name } = this.props;
        return (
            <div>
                <label htmlFor="">{name}</label>
                <input name={name} onChange={this.handleChange} />
            </div>
        );
    }
}

class Form extends React.Component {
    static Input = Input;
    constructor(props) {
        super(props);
        this.state = {
            value: {},
        };
        this.handleMapValueChildInput = this.handleMapValueChildInput.bind(
            this
        );
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMapValueChildInput(key, value) {
        this.setState({
            value: {
                ...this.state.value,
                [key]: value,
            },
        });
    }

    componentDidMount() {
        console.log("children", this.props.children);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {React.Children.map(this.props.children, (reactElement) => {
                    if (reactElement.type.name !== "Input") {
                        return reactElement;
                    }
                    return React.cloneElement(reactElement, {
                        handleMapValueChildInput: this.handleMapValueChildInput,
                        key: reactElement.props.name,
                    });
                })}
            </form>
        );
    }
}

class FormLearning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input name="username"></Form.Input>
                    <Form.Input name="password"></Form.Input>
                    <button type="submit">Submit</button>
                </Form>
            </div>
        );
    }
}

export default FormLearning;
