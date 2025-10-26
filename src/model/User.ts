import mongoose, {Schema, Document} from 'mongoose';

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content :  {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMEssage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema ({
    username : {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email : {
        typw : String,
        required: [true, 'Email is required'],
        unique: true,
        match : [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verification code expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMEssage: {
        type: Boolean,
        default: true
    },
    messages: {
        type: [MessageSchema],
        default: []
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;