import { Box, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import API from "../../utils/api";
import Controls from "../Controls/Controls";
import { Form, useForm } from "./useForm";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AlertContext, SessionContext } from "../../App";
import AlertService from "../Misc/Alerts";

const initialFValues = {
  project_name: "",
  total_kw: "",
  WTG_numbers: [],
  acquisition_date: null,
  project_deal_type_id: "",
  project_group_id: "",
  project_status_id: "",
  project_id: "",
};

const useStyles = makeStyles((theme) => ({
  container: {},
  button: {
    margin: theme.spacing(1),
  },
  label: {
    textAlign: "center",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    fontWeight: 600,
    letterSpacing: 1.3,
    padding: theme.spacing(2, 2),
    width: "100%",
    "&:hover": {
      opacity: "0.9",
    },
  },
  button: {},
}));

export default function UpdateProjectForm(props) {
  const classes = useStyles();
  const [currentProject, setCurrentProject] = React.useState(null);

  const { showAlert, setShowAlert, alertStatus, setAlertStatus } =
    React.useContext(AlertContext);

  const startedProjects = [
    { id: "002", name: "Mettlach" },
    { id: "004 B", name: "Salingen" },
    { id: "008", name: "Watzerath" },
    { id: "009", name: "Zodel" },
  ];

  const projectDealType = [
    { id: "Share", name: "Share" },
    { id: "Asset", name: "Asset" },
  ];
  const projectStatus = [
    { id: "Operating", name: "Operating" },
    { id: "Finished", name: "Finished" },
    { id: "Started", name: "Started" },
  ];

  const projectGroupId = [
    { id: "WLD", name: "WLD" },
    { id: "ING", name: "ING" },
    { id: "SEB", name: "SEB" },
    { id: "JES", name: "JES" },
    { id: "HOL", name: "HOL" },
    { id: "HAS", name: "HAS" },
  ];

  const WTG_numbers = [
    { id: "V70816", name: "V70816" },
    { id: "E701302,16", name: "E701302,16" },
    { id: "E701302,16", name: "E701302,16" },
    { id: "V14852,47", name: "V14852,47" },
    { id: "S2300948,18", name: "S2300948,18" },
    { id: "V14840,47", name: "V14840,47" },
    { id: "V28250,11", name: "V28250,11" },
    { id: "V28257,11", name: "V28257,11" },
  ];

  const getProject = () => {
    API.get("projects/get?id=" + props.project, {})
      .then((response) => {
        console.log(response.data.project);
        setCurrentProject(response.data.project);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    getProject();
  }, []);

  React.useEffect(() => {
    // Set defaults based on the the response from the server
    if (currentProject) {
      values["project_id"] = currentProject["project_id"];
      values["project_name"] = currentProject["project_name"];
      values["total_kw"] = currentProject["total_kw"];
      values["acquisition_date"] = currentProject["acquisition_date"];
      values["project_id"] = currentProject["project_id"];
      values["id"] = currentProject["id"];
    }
  }, [currentProject]);

  const updateProject = () => {
    let data_to_send = values;
    if (values.acquisition_date instanceof Date) {
      data_to_send.acquisition_date = values.acquisition_date
        .toISOString()
        .split("T")[0];
    }

    API.put("/projects/update", data_to_send)
      .then((response) => {
        props.updateProjects();
        setShowAlert(true);
        setAlertStatus({
          severity: "success",
          message: `Project updated`,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
        }
      });
    setShowAlert(false);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateProject();
    }
  };

  return (
    <Container className={classes.container}>
      <Form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {currentProject && (
              <DialogTitle id="form-dialog-title">
                Updating {currentProject["project_name"]}
              </DialogTitle>
            )}
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sm={6}>
                <Controls.Input
                  variant="outlined"
                  label="Project Name"
                  name="project_name"
                  value={values.project_name}
                  onChange={handleInputChange}
                  error={errors.project_name}
                />
              </Grid>
              <Grid item sm={6}>
                <Controls.Input
                  variant="outlined"
                  label="Project Id"
                  name="project_id"
                  value={values.project_id}
                  onChange={handleInputChange}
                  error={errors.project_id}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sm={6}>
                <Controls.Select
                  name="project_group_id"
                  label="Project Group Id"
                  value={values.project_group_id}
                  onChange={handleInputChange}
                  options={projectGroupId}
                  error={errors.project_group_id}
                  identifiers={["name", "id"]}
                />
              </Grid>
              <Grid item sm={6}>
                <Controls.Select
                  name="project_deal_type_id"
                  label="Project deal type id"
                  value={values.project_deal_type_id}
                  onChange={handleInputChange}
                  options={projectDealType}
                  error={errors.project_deal_type_id}
                  identifiers={["name", "id"]}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={5}>
                {" "}
                <Controls.DatePicker
                  name="acquisition_date"
                  label="Acquisition date"
                  value={values.acquisition_date}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sm={6}>
                <Controls.Select
                  name="project_status_id"
                  label="Project Status Id"
                  value={values.project_status_id}
                  onChange={handleInputChange}
                  options={projectStatus}
                  error={errors.project_status_id}
                  identifiers={["name", "id"]}
                />
              </Grid>
              <Grid item sm={6}>
                <Controls.Input
                  variant="outlined"
                  label="Total kw"
                  name="total_kw"
                  type="number"
                  value={values.total_kw}
                  onChange={handleInputChange}
                  error={errors.total_kw}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Controls.Select
                name="WTG_numbers"
                label="WTG numbers"
                multiple
                type="text"
                value={values.WTG_numbers}
                onChange={handleInputChange}
                options={WTG_numbers}
                error={errors.WTG_numbers}
                identifiers={["name", "id"]}
              />
            </Grid>
            <Grid item>
              {" "}
              <DialogActions>
                <Controls.Button
                  className={classes.button}
                  text="CANCEL"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={props.handleClose}
                />{" "}
                <Controls.Button
                  className={classes.button}
                  text="SUBMIT"
                  type="submit"
                  color="primary"
                  size="large"
                  onClick={props.handleClose}
                />{" "}
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Form>
    </Container>
  );
}
