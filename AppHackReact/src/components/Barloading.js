import React from "react";

const BarLoading = (props) => {
    const percent = (props.current / props.max) * 100;

    return (
        <div style={{}} className="loading-bar">
            <div
                style={{ width: percent ? `${percent}%` : "auto" }}
                className="loading-percent"
            ></div>
            <p
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: 0,
                    margin: 0,
                }}
            >
                {percent ? `${percent} %` : "Loading..."}
            </p>
        </div>
    );
};

export default BarLoading;
