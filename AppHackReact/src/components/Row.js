import React from "react";

const Row = (props) => {
    const { password, index } = props;

    return (
        <tr className="animation-color">
            <td>{index}</td>
            <td>{password.password}</td>
            <td>
                {password.isCorrect ? "✅✅ Success ✅✅" : "❌❌ Fail ❌❌"}
            </td>
        </tr>
    );
};

export default Row;
