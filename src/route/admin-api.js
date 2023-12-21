import express from "express";
import adminController from "../controller/admin-controller.js";
import sensorController from "../controller/sensor-controller.js";
import { authMiddleware, checkRole } from "../middleware/auth-middleware.js";

const adminRouter = new express.Router();
// adminRouter.use(authMiddleware);
adminRouter.post(
  "/admin/register",
  // authMiddleware,
  // checkRole("ADMIN"),
  adminController.register
);
adminRouter.get(
  "/admin",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.getData
);
adminRouter.patch(
  "/admin",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.update
);
adminRouter.delete(
  "/admin/logout",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.logout
);
adminRouter.get(
  "/admin/list",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.list
);
adminRouter.put(
  "/admin/users/:id",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.updateUser
);

adminRouter.get(
  "/admin/sensors",
  authMiddleware,
  checkRole("ADMIN"),
  adminController.dataSensor
);

adminRouter.put(
  "/admin/sensors/:id",
  // authMiddleware,
  // checkRole("ADMIN"),
  sensorController.updateSensorMonitoring
);

// adminRouter.post(
//   "/admin/sensors",
//   // authMiddleware,
//   // checkRole("ADMIN"),
//   sensorController.createDataSensor
// );

// adminRouter.put(
//   "admin/sensor",
//   // authMiddleware,
//   // checkRole("ADMIN"),
//   adminController.updateDataSensor
// );
export { adminRouter };
