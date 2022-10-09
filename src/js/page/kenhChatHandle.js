
const users = [];

const addUser = ({ id, name, room }) => {
    console.log(users)
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    let existingUser = false;
    for(let i=0; i<users.length; i++) {
        if(name === users[i].name) {
            existingUser = true;
            break;
        }
    };
    if (existingUser) {
        return { error: `"${name}" đã được đặt vào thời điểm này. Chờ chủ sở hữu tên "${name}" rời kênh ${room} hoặc đặt tên khác!`};
    }
    const user = { id: id,name: name, room: room };

    users.push(user);
    return { user };

}

const removeUser = (remove) => {
    if(!remove) 
    return users;
    users.splice(users.remove, 1);
}

const getUser = (id) => users
    .find((user) => user.id === id);

const getUsersInRoom = (room) => users
    .filter((user) => user.room === room);

module.exports = {
    addUser, removeUser,
    getUser, getUsersInRoom
};