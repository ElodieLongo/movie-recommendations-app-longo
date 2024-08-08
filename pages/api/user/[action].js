import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import db from '../../../db'

export default withIronSessionApiRoute(
  function handler(req, res) {
    switch(req.query.action) {
      case "getPreferredGenres":
        return getPreferredGenres(req, res);
      case "setPreferredGenres":
        return setPreferredGenres(req, res)
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)

async function getPreferredGenres(req, res) {
  try {
    const { username } = req.query;
    const preferredGenres = await db.user.getPreferredGenres(username);
    res.status(200).json(preferredGenres);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function setPreferredGenres(req, res) {
  try {
    const {username, genres} = req.body
    const {preferredGenres} = await db.user.setPreferredGenres(username, genres)
    await req.session.save()
    res.status(200).json(preferredGenres);
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}
