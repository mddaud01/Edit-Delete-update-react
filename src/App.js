import "./styles.css";

import React, { useState } from "react";

function UserManagement() {
  // Step 1: Initialize state for user data and user being edited
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
  ]);

  const [editingUser, setEditingUser] = useState(null);

  // Step 2: Create state variables to manage input fields for adding a new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  // Step 3: Function to add a new user
  const addUser = () => {
    // Check if both name and email are provided
    if (newUserName && newUserEmail) {
      // Create a new user object with an incremented id
      const newUser = {
        id: users.length + 1,
        name: newUserName,
        email: newUserEmail
      };
      // Update the 'users' state with the new user
      setUsers([...users, newUser]);
      // Clear input fields
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  // Step 4: Function to update an existing user
  const updateUser = (id, name, email) => {
    // Map over the existing users and update the user with the matching id
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: name, email: email } : user
    );
    // Update the 'users' state with the updated user list
    setUsers(updatedUsers);
    // Clear the 'editingUser' state
    setEditingUser(null);
  };

  // Step 5: Function to delete a user
  const deleteUser = (id) => {
    // Filter out the user with the matching id from the 'users' state
    const updatedUsers = users.filter((user) => user.id !== id);
    // Update the 'users' state with the filtered user list
    setUsers(updatedUsers);
  };

  // Step 6: Render the user management interface
  return (
    <div className="UserManagement">
      <h1>User Management System</h1>
      {/* Display the list of users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){/* Buttons to edit and delete users */}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Display the form for adding/editing users */}
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form>
        {/* Input fields for name and email */}
        <input
          type="text"
          placeholder="Name"
          value={editingUser ? editingUser.name : newUserName}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUserName(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUserEmail}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUserEmail(e.target.value)
          }
        />
        {/* Depending on whether editing or adding, display the appropriate button */}
        {editingUser ? (
          <button
            type="button"
            onClick={() =>
              updateUser(editingUser.id, editingUser.name, editingUser.email)
            }
          >
            Update User
          </button>
        ) : (
          <button type="button" onClick={addUser}>
            Add User
          </button>
        )}
      </form>
    </div>
  );
}

export default UserManagement;
