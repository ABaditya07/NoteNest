import mongoose from 'mongoose';

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');
    }
    catch(error){
        console.log('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }

}
export default connectDB;