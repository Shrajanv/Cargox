const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyCustomerToken } = require("../Middleware/authCustomer");
const {
  Register,
  Login,
  getProfile,
  submitContactFeedback,
  getAllCategories,
  viewSingleService,
  viewAllServices,
  bookService,
  getBookings,
  cancelBooking,
  payForBooking,
  feedbackForBooking,
} = require("../Controllers/customerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/customer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const storageBooking = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/customer/booking");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadBooking = multer({ storage: storageBooking });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyCustomerToken, getProfile);
router.post("/submitContactFeedback", submitContactFeedback);
router.get("/getAllCategories", getAllCategories);
router.get("/viewAllServices", viewAllServices);
router.get("/getSingleService/:id", viewSingleService);
router.post(
  "/bookService",
  VerifyCustomerToken,
  uploadBooking.fields([
    { name: "packagePicture", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  bookService
);
router.get("/getBookings", VerifyCustomerToken, getBookings);
router.put("/cancelBooking/:id", VerifyCustomerToken, cancelBooking);
router.put("/payForBooking/:id", VerifyCustomerToken, payForBooking);
router.put("/feedbackForBooking/:id", VerifyCustomerToken, feedbackForBooking);

module.exports = router;
