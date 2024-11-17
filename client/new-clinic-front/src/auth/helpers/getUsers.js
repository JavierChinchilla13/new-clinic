import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

const getUser = () => {
  let success = false
  api.get("/login")
  .then((response) => {
    console.log("Login successful", response.data);
    success = true;
  })
  .catch((error) => {
    console.error("Login failed", error);
  });
  return success; 
};

// const createUser2 = () => api.post("/login");


const createUser = (user) => {

  let success = false
  api.post("/login", user )
    .then((response) => {
      console.log("Registration successful", response.data);
      success = true;
    })
    .catch((error) => {
      console.error("Registration failed", error);
    });

    return success;
};



export { getUser, createUser };
