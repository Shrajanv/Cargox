const express = require("express");
const connectMongoDb = require("./db");
const cors = require("cors");
connectMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
//customer
app.use("/customer", require("./Routes/customerRoutes"));
app.use("/uploads/customer", express.static("./Uploads/customer"));
app.use(
  "/uploads/customer/getImagesFromAdmin",
  express.static("./Uploads/admin")
);
app.use(
  "/uploads/customer/getImagesFromCompany",
  express.static("./Uploads/company")
);

//company
app.use("/company", require("./Routes/companyRoutes"));
app.use("/uploads/company", express.static("./Uploads/company"));
app.use(
  "/uploads/company/getImagesFromAdmin",
  express.static("./Uploads/admin")
);
app.use(
  "/uploads/company/getImagesFromCustomerBooking",
  express.static("./Uploads/customer/booking")
);

//admin
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/uploads/admin", express.static("./Uploads/admin"));
app.use(
  "/uploads/admin/getImagesFromCustomer",
  express.static("./Uploads/customer")
);
app.use(
  "/uploads/admin/getImagesFromCompany",
  express.static("./Uploads/company")
);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
