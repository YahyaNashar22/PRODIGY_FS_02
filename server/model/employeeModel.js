import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    baseSalary: {
        type: Number,
        required: true
    },
    monthlyHours: [{
        year: {
            type: Number,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        hours: {
            type: Number,
            required: true
        }
    }],
    monthlySalary: [{
        year: {
            type: Number,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        }
    }]
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;