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
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        console.log(`found all ${(await friends).length} friends`);
        const formattedFriends = await friends.map(
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


/* FRIEND/UNFRIEND SOMEONE */
export const addRemoveFriend = async (req, res) => {
    try {
        console.log('Inside addRemoveFriend function');
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)){
            //unfriending both from each other
            console.log(`unfriending ${user.firstName} and ${friend.firstName}`);
            user.friends = user.friends.filter((fId) => fId !== friendId);
            friend.friends = friend.friends.filter((fId) => fId !== id);
        } else {
            //befrinding both users
            console.log(`befriending ${id} and ${friendId}`);
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        //saving both updated records
        await user.save();
        await friend.save();
        //formatting user's record before returning to the UI
        const friends = await Promise.all(
            user.friends.map((fId) => User.findById(fId))
        );
        console.log(`found all ${(await friends).length} friends`);
        const formattedFriends = await friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )
        res.status(200).json({ formattedFriends: formattedFriends });
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}