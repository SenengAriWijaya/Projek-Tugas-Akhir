import express from "express";
import sensorController from "../controller/sensor-controller.js";

const routerSensor = new express.Router();

// adminRouter.post(
//   "/admin/sensors",
//   // authMiddleware,
//   // checkRole("ADMIN"),
//   sensorController.createDataSensor
// );

routerSensor.post("/api", sensorController.createDataSensor);

export { routerSensor };
