import User from "../../models/Users.js";

const ExpireVerification = async (req, res) => {
  try {
    const AllUsers = await User.find();

    AllUsers.forEach(async (user) => {
      if (user?.verifyToken) {
        if (Date.now() > new Date(user.verifyTokenExpiry).getTime()) {
          const expireToken = await User.findOneAndUpdate(
            { uniqueId: user.uniqueId },
            {
              $unset: {
                verifyToken: "",
                verifyTokenExpiry: "",
              },
            },
            { new: true }
          );
          if (expireToken) {
            console.log(user.uniqueId + " Verify Token has been Expired");
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default ExpireVerification;
