import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected:', connection.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToDB;
