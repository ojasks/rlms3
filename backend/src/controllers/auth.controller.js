import { User } from "../models/user.model.js";
import { generateTokens } from "../utils/jwt.js";
import { ROLES } from "../constants.js";

export const register = async (req, res) => {
  const { username, email, password, role, groupHeadFormType } = req.body;

  // Validate group head form type
  if (role === ROLES.GROUP_HEAD && !groupHeadFormType) {
    return res.status(400).json({ error: "Group heads must specify form type" });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
      groupHeadFormType: role === ROLES.GROUP_HEAD ? groupHeadFormType : undefined
    });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        groupHeadFormType: user.groupHeadFormType
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        groupHeadFormType: user.groupHeadFormType
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


// // Add this at the top with other imports
// import { registerValidator } from "../utils/validators.js";

// // Update your existing register function to be more robust
// export const register = async (req, res) => {
//   const { username, email, password, role, groupHeadFormType } = req.body;

//   try {
//     // Additional validation
//     if (role === ROLES.ADMIN) {
//       return res.status(403).json({ error: "Admin registration requires special privileges" });
//     }

//     // Validate group head form type
//     if (role === ROLES.GROUP_HEAD) {
//       if (!groupHeadFormType) {
//         return res.status(400).json({ error: "Group heads must specify form type" });
//       }
//       if (!FORM_TYPES.includes(Number(groupHeadFormType))) {
//         return res.status(400).json({ error: "Form type must be between 1-9" });
//       }
//     }

//     // Check if username or email already exists
//     const existingUser = await User.findOne({ 
//       $or: [{ username }, { email }] 
//     });
    
//     if (existingUser) {
//       return res.status(409).json({ 
//         error: "Username or email already exists" 
//       });
//     }

//     // Create user (your existing code is good)
//     const user = await User.create({
//       username,
//       email,
//       password,
//       role: role || ROLES.USER, // Default to normal user if not specified
//       groupHeadFormType: role === ROLES.GROUP_HEAD ? Number(groupHeadFormType) : undefined
//     });

//     // Generate tokens (your existing code is good)
//     const { accessToken, refreshToken } = generateTokens(user);
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(201).json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         groupHeadFormType: user.groupHeadFormType
//       },
//       accessToken,
//       refreshToken
//     });

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export { 
//   register, 
//   login 
// };