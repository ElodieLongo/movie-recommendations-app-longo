import User from './models/user'
import dbConnect from './connection'

export async function create(username, password) {
  if (!(username && password))
    throw new Error('Must include username and password')

  await dbConnect()

  const user = await User.create({username, password,  preferredGenres: []})

  if (!user)
    throw new Error('Error inserting User')

  return {
    user: {
      username: user.username,
      id: user._id,
      preferredGenres: user.preferredGenres,
      __v: user.__v
    }
  }
}


export async function getPreferredGenres(username) {
  if (!username)
    throw new Error('Must provide a username')

  await dbConnect()

  const user = await User.findOne({ username })

  if (!user)
    throw new Error('User not found')

  return user.preferredGenres
}

export async function setPreferredGenres(username, genres) {
  if (!username)
    throw new Error('Must provide a username')

  if (!Array.isArray(genres) || !genres.every(genre => typeof genre === 'number'))
    throw new Error('Genres must be an array of numbers')

  await dbConnect()

  const updatedUser = await User.findOneAndUpdate(
    { username },
    { $set: { preferredGenres: genres } },
    { new: true, runValidators: true }
  )

  if (!updatedUser)
    throw new Error('User not found')

  return updatedUser.preferredGenres
}