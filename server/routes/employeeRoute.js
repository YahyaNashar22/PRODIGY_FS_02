import express from "express";
import { createEmployee, deleteEmployee, editEmployee, filterEmployeesByPosition, getAllEmployees, getEmployeeById, searchEmployee } from "../controller/employeeController.js";
import { authorized, checkRole } from "../middleware/authorization.js";

const employeeRouter = express.Router();

employeeRouter.post('/create', authorized, checkRole('admin'), createEmployee);
employeeRouter.get('/getall', authorized, checkRole('admin'), getAllEmployees);
employeeRouter.get('/get/:id', authorized, checkRole('admin'), getEmployeeById);
employeeRouter.put('/edit/:id', authorized, checkRole('admin'), editEmployee);
employeeRouter.delete('/delete/:id', authorized, checkRole('admin'), deleteEmployee);
employeeRouter.post('/search', authorized, checkRole('admin'), searchEmployee);
employeeRouter.post('/filter', authorized, checkRole('admin'), filterEmployeesByPosition);

export default employeeRouter;