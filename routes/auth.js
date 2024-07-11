import express from 'express';
import bcrypt from 'bcrypt';
import User from '../DB/models/User.js'; 
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch for email:', email);
      return res.status(400).send('Invalid email or password');
    }

    console.log('User logged in successfully:', email);
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

export default router;
