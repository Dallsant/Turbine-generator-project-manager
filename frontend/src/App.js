import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "./global";
import Container from "@material-ui/core/Container";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import API from "./utils/api";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AlertService from "./components/Misc/Alerts";
import Navigation from "./components/Navigation/Navigation";
import { Typography } from "@material-ui/core";

export const AlertContext = React.createContext(null);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      // marginTop: "80px !important",
    },
  },
}));

function App() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState({
    severity: "success",
    message: "",
  });
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let themeDefaults = {
    palette: {
      type: "dark",
      spacing: 4,
    },
  };
  const classes = useStyles();
  const theme = React.useMemo(
    () => createMuiTheme(themeDefaults),
    [prefersDarkMode]
  );
  const [newTheme, setNewTheme] = React.useState(theme);

  React.useEffect(() => {
    setTimeout(() => {
      if (showAlert === true) {
        setShowAlert(false);
      }
    }, 3000);
  }, [showAlert]);

  return (
    <AlertContext.Provider
      value={{ showAlert, setShowAlert, alertStatus, setAlertStatus }}
    >
      <ThemeProvider theme={newTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <GlobalStyles />
          <Router>
            <Navigation />

            <Switch>
              <Route path="/projects" exact render={() => <HomePage />} />
              <Route path="/" exact render={() => <Login />} />
            </Switch>
          </Router>
          {showAlert ? <AlertService alertStatus={alertStatus} /> : <></>}
        </div>
      </ThemeProvider>
    </AlertContext.Provider>
  );
}

export default App;
