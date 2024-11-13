const  mongoose= require("../utils/database_connextion");

// Define the User schema
User = mongoose.model("User", {
  name: String,
  email: String,
});

module.exports = User;
