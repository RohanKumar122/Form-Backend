const express = require('express');
const path = require('path');
const User = require('./models/userSchema');
const app = express();
const axios = require('axios');


// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// // Route to handle form submission
// app.post('/submit', (req, res) => {
//   const { name, email } = req.body;

//   const user = new User({ name, email });
//   user.save()
//     .then(() => {
//       res.send(`<h1>Form Submitted!</h1><p>Name: ${name}</p><p>Email: ${email}</p>`);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('An error occurred while saving the user.');
//     }); 
  
// });

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  axios.post('https://node-js-backend-h2po.onrender.com/user', { name, email })
    .then((response) => {
      res.send(`<h1>Form Submitted!</h1><p>Name: ${name}</p><p>Email: ${email}</p>`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred while submitting the data.');
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
