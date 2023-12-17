const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

//app.use(cors());
app.options('*', cors());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/yoga', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://127.0.0.1:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });


// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  selectedBatch: String,
  paymentStatus: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint for form submission
app.post('/api/submit', async (req, res) => {
  try {
    const { name, age, selectedBatch } = req.body;

    // Simulate payment
    const paymentStatus = CompletePayment();

    // Save data to MongoDB
    const newUser = new User({
      name,
      age,
      selectedBatch,
      paymentStatus,
    });

    await newUser.save();

    // Return response to frontend
    res.json({ success: true, paymentStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Mock payment function
function CompletePayment() {
  // Simulate success or failure
  return Math.random() < 0.5 ? 'success' : 'failure';
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
