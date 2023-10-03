import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  rol: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true },

});
userSchema.methods.encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
userSchema.methods.validatePassword = async function (password:string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
