const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer"); // email handler
// const { v4: uuidv4 } = require("uuid"); // unique string
// const { google } = require("googleapis");
// const envVariables = require("../constants/index");
const User = require("../models/userModel");
// const UserVerification = require("../models/userVerification");

// nodemailer transporter
// const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, ACCESS_TOKEN, USER_EMAIL } =
//   envVariables;

// const OAuth2 = google.auth.OAuth2;
// const OAuth2Client = new OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: USER_EMAIL,
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: ACCESS_TOKEN,
//   },
// });

// test transporter
// transport.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready for use");
//     console.log(success);
//   }
// });

const { getUserByEmail, getCurrentUser } = require("../services/userServices");

// CREATE A NEW USER
const createUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  try {
    const userExist = await getUserByEmail(email); // checks if user has already onboarded

    if (userExist) {
      return res
        .status(403)
        .json({ error: "User with this email already exists." });
    }

    // hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating a new user here
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      // verified: false,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed." });
    }
    // handle account verification
    // sendVerificationEmail(result, res);

    return res.status(200).json({
      message: "Signup success! Please procedd to login.",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// send verification email
// const sendVerificationEmail = ({ _id, email }, res) => {
// url to be used in email
// const currentUrl = "http://localhost:4000/";

// const uniqueString = uuidv4() + _id;

//email options
// const mailOptions = {
//   from: process.env.USER_EMAIL,
//   to: email,
//   subject: "Please Verify Your Email Address",
//   html: `<p>Verify your email address to complete the signup and login into your account.</p> <p>This link <b>expires in 6hours</b></p>. <p>Press <a href=${
//     currentUrl + "user/verify/" + _id + "/" + uniqueString
//   }>here</a></p>`,
// };

// hash the uniqueString
//   const saltRounds = 10;
//   bcrypt
//     .hash(uniqueString, saltRounds)
//     .then((hashedUniqueString) => {
//       const newVerification = new UserVerification({
//         userId: _id,
//         uniqueString: hashedUniqueString,
//         createdAt: Date.now(),
//         expiresAt: Date.now() + 21600000,
//       });

//       newVerification
//         .save()
//         .then(() => {
//           transporter
//             .sendMail(mailOptions)
//             .then(() => {
//               res
//                 .status(202)
//                 .json({
//                   status: "Pending",
//                   message: "Email has been sent pending verification!",
//                 });
//             })
//             .catch((error) => {
//               res
//                 .status(500)
//                 .json({ error: "Something went wrong with sending email." });
//             });
//         })
//         .catch((error) => {
//           res.status(500).json({
//             error: "Something went wrong with saving verification email data.",
//           });
//         });
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "Something went wrong with email hash data." });
//     });
// };

// veriify email
// router.get("/verify/:userId/:uniqueString",(req, res) => {
//   const {userId, uniqueString} = req.params;

//   UserVerification
//   .find({userId})
//   .then()
//   .catch((error) => {
//     console.log(error);

//   })
// } )

// const getMe = async (req, res) => {
//   // querrying database using created user id to return user details
//   const { id } = req.user;

//   try {
//     const user = await getCurrentUser(id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found!" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     return res.status(500).json({ error: "Something went wrong." });
//   }
// };

module.exports = { createUser };
