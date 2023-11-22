import userService from "../service/user-service.js";

const getUser = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.getUser(username);
    res.status(200).json({
      status: "success",
      data: result,
      message: "data fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;
    const result = await userService.updateUser(request);
    res.status(200).json({
      status: "success",
      data: result,
      message: "profile updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.user.username);
    res.status(200).json({
      status: "success",
      message: "Logged out Successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { getUser, updateUser, logoutUser };
