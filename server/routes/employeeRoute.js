import express from "express";
import { createEmployee, deleteEmployee, editEmployee, filterEmployeesByPosition, getAllEmployees, getEmployeeById, searchEmployee } from "../controller/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post('/create', createEmployee);
employeeRouter.get('/getall', getAllEmployees);
employeeRouter.get('/get/:id', getEmployeeById);
employeeRouter.put('/edit/:id', editEmployee);
employeeRouter.delete('/delete/:id', deleteEmployee);
employeeRouter.post('/search', searchEmployee);
employeeRouter.post('/filter', filterEmployeesByPosition);

export default employeeRouter;