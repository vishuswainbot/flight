const jwt = require("jsonwebtoken");
const secret = "Vishu@123";

function setUser(user){
    console.log(user);
    return jwt.sign({
        _id: user.id,
        email: user.userEmail,
    }, secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports={
    setUser,
    getUser,
};