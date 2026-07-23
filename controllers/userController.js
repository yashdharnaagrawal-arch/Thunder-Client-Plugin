const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const filePath = path.join(__dirname, ".." ,"user.json");

const getData = () =>{
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
}

const saveData = (users)=>{
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

const register = async (req, res)=>{
    let users = getData();

    const {email, password} = req.body;

    const existUser = users.find((e)=> e.email === email);

    if(existUser){
        return res.status(400).json({message: "User Already Exist"});
    }

    const hashPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = {
        id: users.length +1,
        email,
        password: hashPassword
    }

    users.push(newUser);

    saveData(users);

    return res.status(200).json({message: "User Register Successfully"});
}

const login = async(req, res)=>{
    let users = getData();

    const {email, password} = req.body;

    const user = users.find((e)=> e.email === email);

    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const passMatch = await bcrypt.compare(String(password), user.password)

    if(!passMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    return res.status(200).json({message: "User Login Successfully"});
}

const getUser = (req, res)=>{
    const users = getData();

    res.json(users);
}

const updateUser = (req, res) => {
  let users = getData();

  const id = Number(req.params.id);
  const { email, password } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    email,
    password,
  };

  saveData(users);

  res.status(200).json({
    message: "User updated successfully",
    user: users[userIndex],
  });
};

const deleteUser = (req, res) => {
  let users = getData();

  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users = users.filter((user) => user.id !== id);

  saveData(users);

  res.status(200).json({
    message: "User deleted successfully",
  });
};

module.exports= {register, login, getUser, updateUser, deleteUser}