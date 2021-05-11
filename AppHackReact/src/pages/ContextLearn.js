import React from "react";

const ThemeContext = React.createContext({
    theme: "yellow",
    user: {
        name: "Le Minh Cuong",
        age: 22,
        isSingle: true,
        isMale: true,
    },
});

const LanguageContext = React.createContext({
    lang: "vi",
});

class MyLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "vi",
            handleChangeLang: this.handleChangeLang,
        };
    }

    handleChangeLang = () => {
        if (this.state.lang === "vi") {
            this.setState({
                ...this.state,
                lang: "us",
            });
        } else {
            this.setState({
                ...this.state,
                lang: "vi",
            });
        }
    };

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}

ThemeContext.displayName = "ThemeContext";

class Button extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({ lang, handleChangeLang }) => {
                    return (
                        <ThemeContext.Consumer>
                            {(value) => {
                                console.log(value);
                                console.log(lang, handleChangeLang);
                                return (
                                    <button
                                        onClick={value.handleChangeTheme}
                                        style={{ backgroundColor: value.theme }}
                                    >
                                        My Button {lang}
                                    </button>
                                );
                            }}
                        </ThemeContext.Consumer>
                    );
                }}
            </LanguageContext.Consumer>
        );
    }
}

class Input extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {(value) => {
                    return <input placeholder="Please enter something" />;
                }}
            </ThemeContext.Consumer>
        );
    }
}

class Toolbar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Button></Button>
                <Input></Input>
            </React.Fragment>
        );
    }
}

class ContextLearn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "yellow",
            user: {
                name: "Le Minh Cuong",
                age: 22,
                isSingle: true,
                isMale: true,
            },
            music: Array.from({ length: 5 }).map(
                (item, index) => "Song " + index
            ),
            title: "Theme Context",
            handleChangeTheme: this.handleChangeTheme,
        };
        this.handleChangeTheme = this.handleChangeTheme.bind(this);
    }

    handleChangeTheme = () => {
        if (this.state.theme === "yellow") {
            this.setState({
                ...this.state,
                theme: "red",
            });
        } else {
            this.setState({
                ...this.state,
                theme: "yellow",
            });
        }
    };

    render() {
        return (
            <MyLanguage>
                <ThemeContext.Provider value={this.state}>
                    <Toolbar></Toolbar>
                </ThemeContext.Provider>
            </MyLanguage>
        );
    }
}

export default ContextLearn;
