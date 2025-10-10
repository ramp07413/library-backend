import express from "express";
import {
  getAlerts,
  createAlert,
  markAsRead,
  markAllAsRead,
  deleteAlert,
  getAlertStats,
} from "../../controllers/library/alertController.js";
import {  createAlertValidation, validateAlert } from "../../middleware/validation.js";

const router = express.Router();

router.get("/", getAlerts); 
router.post("/",createAlertValidation,validateAlert, createAlert); 
router.patch("/:id/read", createAlertValidation,validateAlert, markAsRead); 
router.patch("/read-all",createAlertValidation,validateAlert, markAllAsRead); 
router.delete("/:id", deleteAlert); 
router.get("/stats", getAlertStats); 

export default router;
