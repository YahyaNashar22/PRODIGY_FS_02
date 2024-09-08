import Employee from "../model/employeeModel.js";

// Create employee
export const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, position, baseSalary } = req.body;

        const newEmployee = new Employee({
            firstName,
            lastName,
            phoneNumber,
            position,
            baseSalary
        });
        await newEmployee.save();
        res.status(201).json({
            message: 'employee created successfully',
            payload: newEmployee
        })
    } catch (error) {
        res.status(500).json({
            message: "problem creating employee",
            error: error.message
        })
    }
}

// Edit employee details
export const editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber, position, baseSalary } = req.body;

        const employee = await Employee.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                phoneNumber,
                position,
                baseSalary
            },
            { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'employee not found!' });
        res.status(200).json({
            message: "employee details edited successfully",
            payload: employee
        })
    } catch (error) {
        res.status(500).json({
            message: "problem editing employee",
            error: error.message
        })
    }
}

// Get specific employee by id
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);

        if (!employee) return res.status(404).json({ message: 'employee not found' });
        res.status(200).json({
            message: 'employee found successfully',
            payload: employee
        })
    } catch (error) {
        res.status(500).json({
            message: "problem fetching employee",
            error: error.message
        })
    }
}

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).sort({ createdAt: -1 });
        if (!employees || employees.length == 0) return res.status(404).json({ message: "no employees found" });
        res.status(200).json({
            message: "employees fetched successfully",
            payload: employees
        })
    } catch (error) {
        res.status(500).json({
            message: "problem fetching employees",
            error: error.message
        })
    }
}

// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) return res.status(404).json({ message: 'employee not found' });
        res.status(200).json({
            message: 'employee deleted successfully',
            payload: employee
        })
    } catch (error) {
        res.status(500).json({
            message: "problem deleting employee",
            error: error.message
        })
    }
}

// search by firstName, lastName, phoneNumber
export const searchEmployee = async (req, res) => {
    try {
        const { searchQuery } = req.body;

        // Ensure searchQuery is a string and trim any extra spaces
        const query = searchQuery ? searchQuery.trim() : ""
        const employees = await Employee.find({
            $or: [
                { firstName: new RegExp(query, 'i') },
                { lastName: new RegExp(query, 'i') },
                { phoneNumber: new RegExp(query, 'i') }
            ]
        });
        if (!employees || employees.length == 0) return res.status(404).json({
            message: 'no employees match your search'
        });
        res.status(200).json({
            message: `found employees that match ${searchQuery}`,
            payload: employees
        })
    } catch (error) {
        res.status(500).json({
            message: "problem searching for employees",
            error: error.message
        })
    }
}

// filter by position
export const filterEmployeesByPosition = async (req, res) => {
    try {
        const { filterQuery } = req.body;

        const query = filterQuery ? filterQuery.trim() : ""

        const employees = await Employee.find({
            position: new RegExp(query, 'i')
        })

        if (!employees || employees.length == 0) return res.status(404).json({
            message: 'no employees match your filter'
        });
        res.status(200).json({
            message: `found employees that match ${filterQuery}`,
            payload: employees
        })
    } catch (error) {
        res.status(500).json({
            message: "problem filtering by position for employees",
            error: error.message
        })
    }
}