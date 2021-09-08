import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CustomTable from "../components/Table/Table";
import API from "../utils/api";
import {
  Delete,
  InsertDriveFileOutlined,
  Language,
  VerifiedUser,
} from "@material-ui/icons";
import AddNewProjectForm from "../components/Forms/AddNewProjectForm";
import { Dialog, Grid } from "@material-ui/core";
import LoginForm from "../components/Forms/LoginForm";

const useStyles = makeStyles((theme) => ({
  container: { marginTop: "200px !important" },
}));

function Login(props) {
  const classes = useStyles();

  React.useEffect(() => {}, []);

  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sm={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
}

Login.propTypes = {};

export default Login;
