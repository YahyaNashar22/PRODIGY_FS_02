import { verifyToken } from "../utils/token.js";

//Check if the user is signed in ( if the token is in the cookie )
export const authorized = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(500).send("No token !");
    } else {
      const decoded = verifyToken(token);
      req.id = decoded.data.id;
      req.role = decoded.data.role;
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

//
export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      //Checks the role to see if authorized to continue
      if (req.role === role) {
        console.log("user authorized");
        next();
      } else {
        res.status(500).send("Not authorized");
      }
    } catch (err) {
      return res.status(404).send("Something went wrong");
    }
  };
};
