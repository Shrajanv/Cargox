const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyAdminToken } = require("../Middleware/authAdmin");
const {
  Register,
  Login,
  getProfile,
  getAllCompanies,
  getAllCustomers,
  insertCategory,
  getAllCategories,
  updateCategory,
  updateCompanyStatus,
  updateCustomerStatus,
  getAllFeedbacks,
  getAllBookings,
  getCounts,
} = require("../Controllers/adminController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/admin");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyAdminToken, getProfile);

//category
router.post(
  "/insertCategory",
  VerifyAdminToken,
  upload.single("picture"),
  insertCategory
);
router.get("/getAllCategories", VerifyAdminToken, getAllCategories);
router.put(
  "/updateCategory/:id",
  VerifyAdminToken,
  upload.single("picture"),
  updateCategory
);

router.get("/getAllCompanies", VerifyAdminToken, getAllCompanies);
router.put("/updateCompanyStatus/:id", VerifyAdminToken, updateCompanyStatus);
router.get("/getAllCustomers", VerifyAdminToken, getAllCustomers);
router.put("/updateCustomerStatus/:id", VerifyAdminToken, updateCustomerStatus);

router.get("/getAllFeedbacks", VerifyAdminToken, getAllFeedbacks);
router.get("/getAllBookings", VerifyAdminToken, getAllBookings);
router.get("/getCounts", VerifyAdminToken, getCounts);
module.exports = router;
