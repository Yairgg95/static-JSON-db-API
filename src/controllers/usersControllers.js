const { readDatabase, writeDatabase } = require("../lib/db");
const User = require("../models/usersModel");

async function getAllUsers() {
  const db = await readDatabase();
  return db.users;
}

async function getUserById(id) {
  const db = await readDatabase();
  const user = db.users.find((user) => user.id == id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function createUser(data) {
  if (!data.name || !data.email) {
    throw new Error(
      "Missing information, you need name and email to create user"
    );
  }
  const db = await readDatabase();
  const users = db.users;
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = new User(newId, data.name, data.email);
  users.push(newUser);
  writeDatabase(db);
  return newUser;
}

async function deleteUserByid(id) {
  if (!id) {
    throw new Error("Missing user Id");
  }
  const db = await readDatabase();
  const users = db.users;
  if (users.length == 0) {
    throw new Error("there is no users in the database");
  }
  const deletedUser = users.find((user) => user.id == id);

  if (!deletedUser) {
    throw new Error("User not found");
  }

  const newDb = users.filter((user) => user.id != id);
  writeDatabase({ users: newDb });
  return deletedUser;
}

async function updatedUserByID(id, data) {
  const users = await getAllUsers();
  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex == -1) {
    throw new Error("User not found");
  }
  const user = users[userIndex];

  const updatedUser = { ...user, ...data };

  users[userIndex] = updatedUser;

  writeDatabase({ users });

  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserByid,
  updatedUserByID,
};
