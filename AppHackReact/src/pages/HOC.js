import React, { Fragment, useEffect } from "react";

const logComponent = (ChildComponent) => {
    class WrappedComponent extends React.Component {
        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    return WrappedComponent;
};

const FancyButton = (props) => {
    console.log(props);
    return (
        <Fragment>
            <button ref={props.buttonRef}>
                {props.children ? props.children : "Fancy Button"}
            </button>
            <input ref={props.inputRef} />
        </Fragment>
    );
};

const HOC = () => {
    const WrapComponent = logComponent(FancyButton);
    const buttonRef = React.createRef();
    const inputRef = React.createRef();

    useEffect(() => {
        inputRef.current.addEventListener("focus", function (e) {
            console.log("focus");
            e.target.style.border = "5px solid red";
        });
        inputRef.current.addEventListener("blur", function (e) {
            console.log("blur");
            e.target.style.border = "5px solid #111";
        });
    }, [inputRef]);

    console.log("render");

    return (
        <WrapComponent
            onClick={() => alert("Hello world")}
            name="Click me"
            buttonRef={buttonRef}
            inputRef={inputRef}
        ></WrapComponent>
    );
};

export default HOC;
