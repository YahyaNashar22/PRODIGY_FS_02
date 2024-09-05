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
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true,
        enum: ['Manager', 'Developer', 'Designer', 'QA', 'HR', 'Sales'],
        message: '{VALUE} is not a valid position'
    },
    baseSalary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;