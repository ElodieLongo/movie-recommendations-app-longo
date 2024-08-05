import connectToDatabase from '../../../db/index';
import User from '../../../models/user';

export default async function handler(req, res) {
  await connectToDatabase();
  
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const userId = req.query.userId;
        const user = await User.findOne({ userId });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedUser = await User.findOneAndUpdate(
          { userId: req.body.userId },
          req.body,
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
