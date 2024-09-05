import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    process.env.SECRET_TOKEN
  );
};
export const verifyToken = (token) => {
  //data decoded from the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
