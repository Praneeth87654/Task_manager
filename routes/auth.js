import express from 'express';
import bcrypt from 'bcrypt';
import User from '../DB/models/User.js'; // Correct the path to the User model
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return res.status(400).send('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
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
