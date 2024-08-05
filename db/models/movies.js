import { Schema, model, models } from 'mongoose';


const MovieSchema = new Schema({
    //Movie schema
    movieId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,   
    },
    genre: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
});

export default models.User || model('User', UserSchema)