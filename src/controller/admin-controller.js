import adminService from "../service/admin-service.js";

const register = async (req, res, next) => {
  try {
    const result = await adminService.register(req.body);
    res.status(200).json({
      status: "success",
      data: result,
      message: "create account successfull",
    });
  } catch (e) {
    next(e);
  }
};

const getData = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await adminService.getData(username);
    res.status(200).json({
      status: "success",
      data: result,
      message: "data fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;

    const result = await adminService.update(request);
    res.status(200).json({
      status: "success",
      data: result,
      message: "profile updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await adminService.logout(req.user.username);
    res.status(200).json({
      status: "success",
      message: "Logged out Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await adminService.list(username);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const request = req.body;
    request.id = userId;

    const result = await adminService.updateUser(request);
    res.status(200).json({
      status: "success",
      data: result,
      message: "user update successfully",
    });
  } catch (e) {
    next(e);
  }
};

const dataSensor = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await adminService.monitoringSensor(username);
    res.status(200).json({
      status: "success",
      data: result,
      message: "fetch data sensor successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  getData,
  update,
  logout,
  list,
  updateUser,
  dataSensor,
};
