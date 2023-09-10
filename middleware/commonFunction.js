const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")
const  secretKey="987456321";

module.exports = {
  hashPassword: async (password) => {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash password
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log(error);
    }

    // Return null if error
    return null;
  },

  generateToken: async (user)=>{
    const token=await  jwt.sign({user:user},secretKey,{expiresIn:"1h"})
    return token;

  },
  generateOtp: async () => {
    let otp;
    var digits = "123456789";
    for (let i = 0; i < 4; i++) {
      otp +=await  digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  },
};
