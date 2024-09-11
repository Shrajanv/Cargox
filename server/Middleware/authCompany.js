const jwt = require("jsonwebtoken");
const secretKey = "cargoEx";

const VerifyCompanyToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const storeId = jwt.verify(token, secretKey);
    req.company = storeId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifyCompanyToken };
