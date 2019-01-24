import { Schema } from 'mongoose';
import mongoose from '../database/mongodb';

const animalSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user' }
});

export default mongoose.model('animal', animalSchema);
export { animalSchema };