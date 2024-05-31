const API = "http://192.168.1.55:3001/auth";
const APIEmail = "http://192.168.1.55:3001/Email";
// const API = "https://backendfactamdc.onrender.com/auth";
// const APIEmail = "https://backendfactamdc.onrender.com/Email";

// Create a new task
export const createTask = async (newTask) => {
  const res = await fetch(API + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

// Register a new user
export const crearUser = async (newUser) => {
  const res = await fetch(API + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return await res.json();
};

// Login a user
export const loginUser = async (user) => {
  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

// obtener usuario por by token  req.headers["x-access-token"]
export const getUserByToken = async (token) => {
  const res = await fetch(API + "/user", {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  return await res.json();
};

// obtener todos los usuarios
export const getAllUsers = async (token) => {
  const res = await fetch(API + "/users", {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  return await res.json();
};

// signOut user
export const signOut = async (token) => {
  const res = await fetch(API + "/logout", {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  return await res.json();
};

// Request password reset
export const requestPasswordReset = async (correo) => {
  const res = await fetch(`${APIEmail}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo }),
  });
  return await res.json();
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  const res = await fetch(`${APIEmail}/resetPassword/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });
  return await res.json();
};
