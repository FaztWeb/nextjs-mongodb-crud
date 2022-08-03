import User from "models/User";

export default async function loginHandler(req, res) {
  const { body, method } = req;

  if (method !== "POST")
    return res.status(405).json({
      message: "Method not allowed",
    });

  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

 const userFound = await User.findOne({ email })

  if (!userFound) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  
  const isPasswordValid = await userFound.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is invalid",
    });
  }

  const token = userFound.generateToken();

  return res.status(200).json({
    message: "User logged in",
    token,
  });

}
