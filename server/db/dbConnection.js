import mongoose from 'mongoose'

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`Connected to database`)
    }).catch((err) => {
        console.log(err)
    })
}

export default dbConnection;