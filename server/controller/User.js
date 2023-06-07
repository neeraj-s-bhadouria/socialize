import User from "../model/User.js";

/* GETTING USER BY ID */
export const getUser = async (req, res) => {
    try {
        console.log('Inside getUser by id function');
        const { id } = req.params;
        const user = await User.findById(id).select({password: 0});
        console.log(`user by ${id} : ${user.firstName}`);
        return res.status(200).json({ user: user});
    } catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({ error: error.message});
    }
};


/* GETTING USER FRIENDS*/
export const getUserFriends = async (req, res) => {
    try{
        console.log('Inside getUserFriends function');
        const { id } = req.params;
        const user = await User.findById(id).select({password: 0});
        console.log(`user by ${id}: ${user.firstName}`);
        //finding all the friends records from the ids found in user.friends
        const friends = Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        console.log(`found all ${(await friends).length} friends`);
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json({ formattedFriends: formattedFriends });
    } catch (err) {
        console.log(`error: ${error}`);
        return res.json(500).json({ error: error.message });
    }
}