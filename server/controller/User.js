import User from "../model/User.js";

export const getUser = async (req, res) => {
    try {
        console.log('Inside getUser by id function');
        const { id } = req.params;
        const user = await User.findById(id);
        console.log(`user by ${id} : ${user.firstName}`);
        return res.status(200).json({ user: user});
    } catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({ error: error.message});
    }
};