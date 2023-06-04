import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try{
        console.log('Inside register function.');
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: req.file.path,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(`error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};


/* LOGIN USER */
export const login = async (req, res) => {
    console.log('Inside login function');
    try{
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({ email: email});
        if(!user) return res.status(400).json({ error: 'Either username or password incorrect.'});

        if(! await bcrypt.compare(password, user.password)) 
            return res.status(400).json({ error: 'Either username or password incorrect.'});

        const token = jwt.sign({id: user._id, firstName: user.firstName, email: user.email}, process.env.JWT_SECRET_KEY);
        delete user.password;
        return res.status(200).json({
            message: 'User login success',
            jwt: token,
            user: user
        });
    } catch (err) {
        console.log(`error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}