import { body, validationResult } from "express-validator";

export const validateService = [
  body("name").trim().notEmpty().withMessage("Service name is required").isLength({ max: 100 }),
  body("shortDescription").trim().notEmpty().withMessage("Short description is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category")
    .isIn(["Consultation", "Diagnostics", "Surgery", "Therapy", "Emergency", "Wellness", "Specialist"])
    .withMessage("Invalid category"),
  body("pricing.consultationFee")
    .optional()
    .isNumeric()
    .withMessage("Consultation fee must be a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
