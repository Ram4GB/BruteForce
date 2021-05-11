import React from "react";
import { atom, RecoilRoot, useRecoilState } from "recoil";

const Button = (props) => {
    const [text, setText] = useRecoilState(textState);

    const handleClick = () => {
        setText("Hello");
    };

    return (
        <div>
            {text}
            <button onClick={handleClick}>{props.children}</button>
        </div>
    );
};

const ToolBar = () => {
    return <Button>My Button</Button>;
};

const textState = atom({
    key: "textState",
    default: "",
});

const RecoilLearn = () => {
    return (
        <div>
            <div>RecoilLearn</div>
            <RecoilRoot>
                <ToolBar></ToolBar>
            </RecoilRoot>
        </div>
    );
};

export default RecoilLearn;
