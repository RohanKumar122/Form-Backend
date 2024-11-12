const express = require('express');
const path = require('path');
const mongoose =require('mongoose')
const app = express();

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/form-practice');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
}); 

// Define the User schema
User = mongoose.model('User', {
  name: String,
  email: String,
});

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  const user = new User({ name, email });
  user.save()
    .then(() => {
      res.send(`<h1>Form Submitted!</h1><p>Name: ${name}</p><p>Email: ${email}</p>`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred while saving the user.');
    }); 
  
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
