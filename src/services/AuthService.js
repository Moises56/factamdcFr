const API = "http://172.21.2.100:3001/auth";
/**
 * Create a new task
 */
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
