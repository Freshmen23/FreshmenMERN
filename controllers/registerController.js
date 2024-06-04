const path = require('path')
const User = require('../models/User.js')

const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) =>{
    const { username, email, password, first_name, last_name } = req.body

    if (!username || !email || !password || !first_name || !last_name){
        return res.status(400).json({'message': 'Please provide both username and password'})
    }
        //check for duplicate username
    let duplicateUser = await User.findOne({ email: email }).exec();
    if (duplicateUser) return res.status(409).json({'message': `User with email: ${email} already exists!`})

    try{
        // hashing the pwd
        const hashedPwd = await bcrypt.hash(password, 10)

        // store the new user
        const newUser= new User({
            username: username,
            email : email,
            password:hashedPwd,
            first_name : first_name,
            last_name : last_name
        })
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        return res.status(201).json({'success':`New user ${username} created`})

    }catch(err){
        res.status(500).json({'message':err.message});
    }
    
}


module.exports = {handleNewUser}
