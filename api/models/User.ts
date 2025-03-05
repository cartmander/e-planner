import mongoose, { Document, mongo, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    occupation: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;