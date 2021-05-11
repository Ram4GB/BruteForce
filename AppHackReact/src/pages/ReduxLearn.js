import React, { createContext, useEffect, useState } from "react";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

const USER_MODULE = "USER_MODULE";
const TODO_MODULE = "TODO_MODULE";

const INIT_USER_ACTION = createAction(`${USER_MODULE}_INIT_USER`);
const INIT_TODO_ACTION = createAction(`${USER_MODULE}_INIT_TODO`);

const userReducer = createReducer(
    {
        isLogin: false,
        user: null,
    },
    (builder) => {
        builder.addCase(INIT_USER_ACTION, function (state, action) {
            state.user = action.payload;
            return state;
        });
    }
);

const todoReducer = createReducer(
    {
        todos: [],
    },
    (builder) => {
        builder.addCase(INIT_TODO_ACTION, function (state, action) {
            return state;
        });
    }
);

const store = configureStore({
    reducer: {
        [USER_MODULE]: userReducer,
        [TODO_MODULE]: todoReducer,
    },
});

const Button = (props) => {
    const dispatch = useDispatch();

    const handleClickLogin = () => {
        dispatch(
            INIT_USER_ACTION({ username: "leminhcuong", expiredTime: "7h" })
        );
    };

    return (
        <AppContext.Consumer>
            {(value) => {
                console.log("Context", value);
                return (
                    <button onClick={handleClickLogin}>
                        {props.children}{" "}
                        {value && value[USER_MODULE] && value[USER_MODULE].user
                            ? value[USER_MODULE].user.username
                            : ""}
                    </button>
                );
            }}
        </AppContext.Consumer>
    );
};

const AppContext = createContext({});

const WrapContextRedux = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        setState(store.getState());
        let unsubribe = store.subscribe(function () {
            setState(store.getState());
        });

        return () => {
            unsubribe();
        };
    }, []);

    return (
        <AppContext.Provider value={state}>
            {props.children}
        </AppContext.Provider>
    );
};

export default class ReduxLearning extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <WrapContextRedux>
                    <div>ReduxLearning</div>
                    <Button>Click me please!!</Button>
                </WrapContextRedux>
            </Provider>
        );
    }
}
