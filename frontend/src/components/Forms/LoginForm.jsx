import { Box, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import Controls from "../../components/Controls/Controls";
import { Form, useForm } from "./useForm";
import API from "../../utils/api";
import AlertService from "../Misc/Alerts";
import { AlertContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(6),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },

  textInput: {
    padding: "0 20px 0 20px",
    "& label": {
      color: "#fff !important",
    },
    "& .MuiInput-underline:after": {
      borderColor: "#fff",
    },
    "& .MuiInput-underline:before": {
      borderColor: "#fff",
    },
    "& input": {
      color: "#fff",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    color: "#fff",
  },
  nextButton: {
    minWidth: "180px",
    background: "#1a1a1a",
    color: "#fafafa",
    fontWeight: 600,
    "&:hover": {
      background: "#1a1a1a",
    },
  },
  agreeButton: {},
}));

const initialFValues = {
  email: "mockUpLogin",
  password: "password",
};

function LoginForm(props) {
  const { showAlert, setShowAlert, alertStatus, setAlertStatus } =
    React.useContext(AlertContext);
  const classes = useStyles();
  let history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValue,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const logUser = (data) => {
    history.push("/projects");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      logUser(values);
      resetForm();
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Box textAlign="center" elevation={6}>
          <Paper>
            <Grid
              className={classes.form}
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item>
                <Box mb={6} letterSpacing={2}>
                  <h4 className={classes.title}>Login</h4>
                </Box>
              </Grid>

              <Grid item className={classes.textInput}>
                {" "}
                <Controls.Input
                  name="email"
                  label="Email or Username"
                  // variant="filled"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Grid>

              <Grid item className={classes.textInput}>
                {" "}
                <Controls.Input
                  name="password"
                  label="Password"
                  type="password"
                  // variant="filled"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>

              <Grid item>
                <Box mt={4}>
                  <Controls.Button
                    text="Login"
                    type="submit"
                    color="default"
                    size="large"
                    className={classes.nextButton}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Form>
    </div>
  );
}

export default LoginForm;
