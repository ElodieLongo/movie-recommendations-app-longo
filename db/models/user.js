import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  //User ID
  userId: {
    type: String,
    required: true,
    unique: true
  },  
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200
  },
  //Preferences
  preferences: {
    genres: {type: [String], default: [] },
    actors: {type: [String], default: [] }
  }
});

// hashes the password before it's stored in mongo
UserSchema.pre('save', async function(next) {
  if (this.isNew)
    this.password = await bcrypt.hash(this.password, 10)
  next()
})

export default models.User || model('User', UserSchema)