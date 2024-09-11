const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyCompanyToken } = require("../Middleware/authCompany");
const {
  Register,
  Login,
  getProfile,
  getAllCategories,
  getAllServices,
  insertService,
  updateService,
  getBookingForService,
  getSingleBooking,
  updateBooking,
  updatePaymentStatus,
  getCounts,
} = require("../Controllers/companyController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/company");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyCompanyToken, getProfile);
router.get("/getAllCategories", VerifyCompanyToken, getAllCategories);
router.get("/getAllServices", VerifyCompanyToken, getAllServices);
router.post(
  "/insertService",
  VerifyCompanyToken,
  upload.single("picture"),
  insertService
);
router.put(
  "/updateService/:id",
  VerifyCompanyToken,
  upload.single("picture"),
  updateService
);
router.get("/getBookingForService", VerifyCompanyToken, getBookingForService);
router.get("/getSingleBooking/:id", VerifyCompanyToken, getSingleBooking);
router.put("/updateBooking/:id", VerifyCompanyToken, updateBooking);
router.put("/updatePaymentStatus/:id", VerifyCompanyToken, updatePaymentStatus);
router.get("/getCounts", VerifyCompanyToken, getCounts);

module.exports = router;
