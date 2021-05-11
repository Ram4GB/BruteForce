import React, { useState } from "react";
import reactDom from "react-dom";
import PropTypes from "prop-types";

const WrapComponent = (ChildComponent) => {
    class WrapClass extends React.Component {
        render() {
            return <ChildComponent {...this.props} />;
        }
    }
    return WrapClass;
};

class Modal extends React.Component {
    render() {
        const element = (
            <div
                className={`modal ${
                    this.props.isClose === false ? "active" : ""
                }`}
            >
                {this.props.isClose ? null : (
                    <React.Fragment>
                        <div className="modal-header">{this.props.title}</div>
                        <div className="modal-description">
                            {this.props.description}
                        </div>
                        {this.props.children}
                    </React.Fragment>
                )}
            </div>
        );

        return reactDom.createPortal(element, document.getElementById("modal"));
    }
}

Modal.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};

const Portal = () => {
    const LogComponent = WrapComponent(Modal);
    const [isClose, setClose] = useState(true);

    const handleCloseModal = () => {
        setClose(true);
    };

    const handleOpenModal = () => {
        setClose(false);
    };

    return (
        <React.Fragment>
            <LogComponent
                title="Modal header"
                description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}
                isClose={isClose}
            >
                <button onClick={handleCloseModal}>Close</button>
            </LogComponent>
            <button onClick={handleOpenModal}>Open Modal</button>
        </React.Fragment>
    );
};

export default Portal;
