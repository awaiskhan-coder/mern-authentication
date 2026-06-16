const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res)=>{
    const { name, email, password} = req.body;

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({
            message:"Email Already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
}

exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email})
    
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {id:user._id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    
    )

    res.json({
        message: "Login Successfully",
        token,
        user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
    
    
        
    })
}

exports.updateProfile = async (req, res) => {

    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
        message: "Profile Updated",
        user
    });

};

exports.changePassword = async (req, res) => {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Current password is incorrect"
        });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
        message: "Password Changed Successfully"
    });

};