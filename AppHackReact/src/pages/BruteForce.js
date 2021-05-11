import React, { useEffect, useState } from "react";
import InputType from "../components/InputType";
import InputGoto from "../components/InputGoto";
import InputButton from "../components/InputButton";
import InputWaitForSelector from "../components/InputWaitForSelector";
import InputPassword from "../components/InputPassword";
import io from "socket.io-client";
import Row from "../components/Row";
import BarLoading from "../components/Barloading";

class Form extends React.Component {
    static InputType = InputType;
    static InputGoto = InputGoto;
    static InputButton = InputButton;
    static InputWaitForSelector = InputWaitForSelector;
    static InputPassword = InputPassword;

    constructor(props) {
        super(props);
        this.state = {
            value: {
                url: {
                    // value: "http://localhost:8080/",
                    value: ""
                },
                username: {
                    // selector: "#username",
                    // value: "3117410015",
                    selector: "",
                    value: ""
                },
                password: {
                    // selector: "#password",
                    selector:""
                },
                button: {
                    // value: "#btnSubmit",
                    value: ""
                },
                waitForSelector: {
                    // value: "#login-result",
                    value: ""
                },
            },
        };
        this.handleMapChildValue = this.handleMapChildValue.bind(this);
    }

    handleMapChildValue(name, value) {
        this.setState({
            value: {
                ...this.state.value,
                [name]: {
                    ...this.state.value[name],
                    ...value,
                },
            },
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {React.Children.map(this.props.children, (reactElement) => {
                    if (reactElement.type === "button") {
                        return reactElement;
                    }
                    return React.cloneElement(reactElement, {
                        handleMapChildValue: this.handleMapChildValue,
                        value: this.state.value[reactElement.props.name],
                    });
                })}
            </form>
        );
    }
}

const BruteForce = () => {
    const [data, setData] = useState(null);
    const [password, setPassword] = useState([]);
    const [percent, setPercent] = useState({
        max: 0,
        current: 0,
    });

    const handleSubmit = (value) => {
        try {
            setPassword([]);
            window["socket"].emit("request-to-server", value);
        } catch (error) {}
    };

    useEffect(() => {
        window.socket = io("http://localhost:5000/");
        if (window["socket"]) {
            console.log("Socket turn on listening...");
            window.socket.on("request-to-client-message", function (value) {
                setData(value);
            });
            window.socket.on("request-to-client-password", function (value) {
                console.log("Receive password");
                setPassword((oldPassword) => [value, ...oldPassword]);
                setPercent({
                    max: value.max,
                    current: value.current,
                });
            });
        } else {
            console.log("Socket something wrong");
        }

        return () => {
            if (window.socket) {
                window.socket.close();
            }
        };
    }, []);

    const renderData = () => {
        if (!data) {
            return "";
        }

        return <p>{data.message}</p>;
    };

    const renderPassword = () => {
        if (password.length === 0) {
            return null;
        }
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Index</td>
                        <td>Password</td>
                        <td>Is Correct</td>
                    </tr>
                    {password.map((p, index) => {
                        return (
                            <Row
                                index={password.length - index}
                                key={p.id}
                                password={p}
                            ></Row>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <React.Fragment>
            <div className="container">
                <h1 style={{ fontSize: 40, textAlign: "center" }}>
                    Brute Force Tool
                </h1>
                <div>
                    <img
                        src="https://st3.depositphotos.com/12985790/18246/i/600/depositphotos_182461084-stock-photo-anonymous.jpg"
                        alt=""
                        style={{ width: "100%" }}
                    />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus sit amet tortor eleifend, hendrerit risus a,
                        porttitor sapien. Curabitur eu placerat diam.
                    </p>
                    <p>
                        malesuada fames ac turpis egestas. Praesent sed
                        tristique ligula. Morbi suscipit ex nibh, nec auctor
                        velit lacinia ut. Nullam consectetur tortor vel neque
                        malesuada, eu aliquam mi laoreet. Sed a faucibus velit,
                        vitae pretium magna.
                    </p>
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.InputGoto
                            title="1. Type Url"
                            name="url"
                        ></Form.InputGoto>
                        <Form.InputType
                            title="2. Type Username"
                            name="username"
                        ></Form.InputType>
                        <Form.InputPassword
                            title="3. Type Password"
                            name="password"
                        ></Form.InputPassword>
                        <Form.InputButton
                            title="Then Wait Click Button"
                            name="button"
                        ></Form.InputButton>
                        <Form.InputWaitForSelector
                            title="Then Wait Click Selector"
                            name="waitForSelector"
                        ></Form.InputWaitForSelector>
                        <button type="submit" className="btn">
                            Launch Script
                        </button>
                    </Form>
                </div>
                {renderData()}
                <BarLoading
                    current={percent.current}
                    max={percent.max}
                ></BarLoading>
                <div style={{ overflowY: "scroll", height: 500 }}>
                    {renderPassword()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default BruteForce;
