import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CustomTable from "../components/Table/Table";
import API from "../utils/api";
import {
  Delete,
  Edit,
  InsertDriveFileOutlined,
  Language,
  VerifiedUser,
} from "@material-ui/icons";
import AddNewProjectForm from "../components/Forms/AddNewProjectForm";
import { Box, Dialog, Grid, Typography } from "@material-ui/core";
import UpdateProjectForm from "../components/Forms/UpdateProjectForm";

const useStyles = makeStyles((theme) => ({
  container: { margin: "30px !important" },
}));

const rows = {
  project_name: {
    id: "project_name",
    numeric: false,
    disablePadding: false,
    Header: "Project name",
    accessor: "project_name",
    position: "right",
    type: "text",
  },
  months_acquired: {
    id: "months_acquired",
    numeric: true,
    disablePadding: false,
    Header: "Months Acquired",
    accessor: "months_acquired",
    position: "right",
    type: "text",
  },
  total_kw: {
    id: "total_kw",
    numeric: true,
    disablePadding: false,
    Header: "Total kW",
    accessor: "total_kw",
    position: "right",
    type: "number",
  },
  WTG_numbers: {
    id: "WTG_numbers",
    numeric: false,
    disablePadding: false,
    Header: "WTG numbers",
    accessor: "display_WTG_numbers",
    position: "right",
    type: "text",
    width: 90,
  },
  acquisition_date: {
    id: "acquisition_date",
    numeric: false,
    disablePadding: false,
    Header: "Acquisition date",
    accessor: "acquisition_date",
    position: "right",
    type: "text",
  },
  project_deal_type_id: {
    id: "project_deal_type_id",
    numeric: false,
    disablePadding: false,
    Header: "Project deal type Id",
    accessor: "project_deal_type_id",
    position: "right",
    type: "text",
  },
  project_group_id: {
    id: "project_group_id",
    numeric: false,
    disablePadding: false,
    Header: "Proejct Group Id",
    accessor: "project_group_id",
    position: "right",
    type: "text",
  },
};

function HomePage(props) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const classes = useStyles();
  const [openAddProject, setOpenAddProject] = React.useState(false);
  const handleCloseAddProject = () => {
    setOpenAddProject(false);
  };
  const handleClickOpenAddProject = () => {
    setOpenAddProject(true);
  };

  const [openUpdateProject, setOpenUpdateProject] = React.useState(false);
  const handleCloseUpdateProject = () => {
    setOpenUpdateProject(false);
  };
  const handleClickOpenUpdateProject = () => {
    setOpenUpdateProject(true);
  };

  const getProjects = () => {
    API.get("projects/all", {})
      .then((response) => {
        console.log(response.data.projects);
        setProjects(response.data.projects);
      })
      .catch((error) => console.log(error));
  };

  // const openUpdateProject = () => {
  //   handleClickOpenUpdateProject();
  // };

  const deleteProject = () => {
    let data = { projects: selectedItems };

    API.delete("/projects/delete", data)
      .then((response) => {
        getProjects();
      })
      .catch((error) => {
        console.log(error);
      });
    // setShowAlert(false);
  };

  React.useEffect(() => {
    getProjects();
  }, []);

  const handleSelectionChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  return (
    <div className={classes.container}>
      <Typography>Select one item to see all options</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sm={12}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h5"> Imported projects</Typography>
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Box ml={10} mt={2}>
            <CustomTable
              title="Projects"
              itemsPerPage={10}
              indicators={rows}
              rowsPerPageOptions={[5, 10, 25]}
              data={projects}
              pointer="id"
              onSelectedChange={handleSelectionChange}
              actions={[
                {
                  icon: Delete,
                  callBack: () => deleteProject(),
                  title: "Delete verifications",
                  label: "delete_verifications",
                },
                {
                  icon: InsertDriveFileOutlined,
                  callBack: () => handleClickOpenAddProject(),
                  title: "Add project",
                  label: "add_project",
                },
                {
                  icon: Edit,
                  callBack: () => handleClickOpenUpdateProject(),
                  title: "Update project",
                  label: "update_project",
                },
              ]}
            />{" "}
          </Box>
        </Grid>
      </Grid>

      {/* Add new Project dialog */}
      <Dialog open={openAddProject} onClose={handleCloseAddProject}>
        <AddNewProjectForm
          updateProjects={() => getProjects()}
          events={selectedItems}
          handleClose={handleCloseAddProject}
        />
      </Dialog>
      {/* Update Project dialog */}
      <Dialog open={openUpdateProject} onClose={handleCloseUpdateProject}>
        <UpdateProjectForm
          updateProjects={() => getProjects()}
          project={selectedItems[0]}
          handleClose={handleCloseUpdateProject}
        />
      </Dialog>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
