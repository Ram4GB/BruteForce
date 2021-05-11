import React, { useEffect } from "react";

function Dialog(props) {
    const { item, isOpen, children, handleCloseDialog } = props;

    useEffect(() => {
        console.log("Dialog rendered");
    }, []);

    useEffect(() => {
        console.log("isOpen changed");
    }, [isOpen]);

    useEffect(() => {
        console.log("Always run");
    });

    if (item) {
        return (
            <div className={`dialog ${isOpen ? "active" : ""}`}>
                <div>{item.title}</div>
                <div>{item.description}</div>
                <div>{children}</div>
                <button onClick={() => handleCloseDialog()}>
                    Close Component
                </button>
            </div>
        );
    }
}

export default Dialog;
