import React, { Profiler, Suspense } from "react";
import BruteForce from "./pages/BruteForce";

function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
) {
    // console.log("actualDuration", actualDuration);
    // console.log("baseDuration", baseDuration);
    console
        .log
        // id,
        // phase,
        // actualDuration,
        // baseDuration
        // startTime,
        // commitTime,
        // interactions
        ();
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfor: null,
        };
    }

    componentDidCatch(error, errorInfor) {
        this.setState({
            error,
            errorInfor,
        });
    }

    render() {
        if (this.state.error) {
            return "Something wrong";
        }

        return this.props.children;
    }
}

const App = () => {
    return (
        <Profiler id="Portal" onRender={onRenderCallback}>
            <Suspense fallback={"Loading"}>
                <ErrorBoundary>
                    <BruteForce></BruteForce>
                </ErrorBoundary>
            </Suspense>
        </Profiler>
    );
};

export default App;
