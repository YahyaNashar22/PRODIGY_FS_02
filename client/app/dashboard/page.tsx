// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "../(globaContext)/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
    baseSalary: "",
  }); // New employee state
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9\-\(\)\+\s]*$/; // Adjust regex pattern as needed

    if (regex.test(value)) {
      setNewEmployee({
        ...newEmployee,
        phoneNumber: value,
      });
      setPhoneError(""); // Clear error message if valid
    } else {
      setPhoneError("Invalid phone number format"); // Set error message if invalid
    }
  };

  // Responsive behavior for dialog

  const fetchEmployees = async () => {
    setLoading(true);
    let result;
    try {
      if (searchQuery.length > 0) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/search`,
          { searchQuery }
        );
        console.log(result);
      } else if (filterPosition) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/filter`,
          { filterQuery: filterPosition }
        );
      } else {
        result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/getall`
        );
      }

      setEmployees(result.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [user, router, setUser, searchQuery, filterPosition]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterPosition(e.target.value);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/edit/${selectedEmployee._id}`,
        {
          firstName: selectedEmployee.firstName,
          lastName: selectedEmployee.lastName,
          phoneNumber: selectedEmployee.phoneNumber,
          position: selectedEmployee.position,
          baseSalary: selectedEmployee.baseSalary,
        }
      );

      // If the API call is successful, update the employees state
      if (response.status === 200) {
        const updatedEmployee = response.data.payload;

        // Update the employee in the local state
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee._id === updatedEmployee._id ? updatedEmployee : employee
          )
        );

        // Close the edit modal
        setEditModalOpen(false);

        // Show success message for edit
        setSnackbarMessage(
          `Employee ${createdEmployee.firstName} ${createdEmployee.lastName} edited successfully.`
        );
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/delete/${selectedEmployee._id}`
      );
      console.log("Employee deleted:", selectedEmployee);

      // Refresh the employee list after successful deletion
      setEmployees(employees.filter((emp) => emp._id !== selectedEmployee._id));

      // Close the delete modal
      setDeleteModalOpen(false);

      // Show the snackbar
      setSnackbarMessage(
        `${selectedEmployee.firstName} ${selectedEmployee.lastName} deleted successfully`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/create`,
        newEmployee
      );

      if (response.status === 201) {
        const createdEmployee = response.data.payload;
        setEmployees((prevEmployees) => [...prevEmployees, createdEmployee]);
        setCreateModalOpen(false); // Close the modal after creation
        setNewEmployee({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          position: "",
          baseSalary: "",
        });

        // Show success message for creation
        setSnackbarMessage(
          `Employee ${createdEmployee.firstName} ${createdEmployee.lastName} created successfully.`
        );
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ margin: "20px 50px", width: "80%" }}
      >
        {/* Create Employee Button */}
        <Button
          onClick={handleCreateClick}
          variant="contained"
          color="primary"
          sx={{ margin: "20px" }}
        >
          Create Employee
        </Button>

        <div className=" flex items-center justify-end">
          {/* Search Bar */}
          <TextField
            label="Search Employees"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ margin: "40px 20px" }}
          />

          {/* Position Filter */}
          <FormControl margin="dense" sx={{ margin: "20px", width: "10%" }}>
            <InputLabel>Filter by Position</InputLabel>
            <Select
              value={filterPosition}
              onChange={handleFilterChange}
              label="Filter by Position"
            >
              <MenuItem value="">All Positions</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="QA">QA</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
        </div>

        {loading ? ( // Show spinner when loading is true
          <Box display="flex" justifyContent="center" padding={4}>
            <CircularProgress />
          </Box>
        ) : employees.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Base Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>${employee.baseSalary}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(employee)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(employee)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box display="flex" justifyContent="center" padding={4}>
            <Typography>No employees found.</Typography>
          </Box>
        )}
      </TableContainer>

      {/* Snackbar for delete confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Create Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                value={newEmployee.firstName}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                value={newEmployee.lastName}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Phone Number"
                  fullWidth
                  value={newEmployee.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  error={!!phoneError} // Set error state
                  helperText={phoneError} // Show error message
                  inputProps={{
                    pattern: "[0-9\\-\\(\\)\\+\\s]*", // Adjust pattern if needed
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Position</InputLabel>
                <Select
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      position: e.target.value,
                    })
                  }
                  label="Position"
                >
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="QA">QA</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Base Salary"
                fullWidth
                type="number"
                value={newEmployee.baseSalary}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    baseSalary: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                value={selectedEmployee?.firstName || ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    firstName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                value={selectedEmployee?.lastName || ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    lastName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Phone Number"
                  fullWidth
                  value={selectedEmployee?.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  error={!!phoneError} // Set error state
                  helperText={phoneError} // Show error message
                  inputProps={{
                    pattern: "[0-9\\-\\(\\)\\+\\s]*", // Adjust pattern if needed
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Position Dropdown */}
              <FormControl fullWidth margin="dense">
                <InputLabel>Position</InputLabel>
                <Select
                  value={selectedEmployee?.position || ""}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      position: e.target.value,
                    })
                  }
                  label="Position"
                >
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="QA">QA</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Base Salary"
                fullWidth
                type="number"
                value={selectedEmployee?.baseSalary || ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    baseSalary: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedEmployee?.firstName}{" "}
          {selectedEmployee?.lastName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
