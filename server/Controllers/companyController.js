const companySchema = require("../Models/Company");
const categorySchema = require("../Models/Category");
const serviceSchema = require("../Models/Service");
const bookingSchema = require("../Models/Booking");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail'
  auth: {
    user: "shrajanv30@gmail.com",
    pass: "ftqz mzoa vnly ofar",
  },
});
const secretKey = "cargoEx";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, phone, password, location, licenseNumber, transactionId } = req.body;
    const check = await companySchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCompany = await new companySchema({
        name: name,
        email,
        phone,
        password: hashedPassword,
        location,
        licenseNumber, transactionId,
        status: "Pending",
      }).save();
      // Send email notification
      const mailOptions = {
        from: "shrajanv30@gmail.com",
        to: newCompany.email, // Assuming the company's email is stored in the 'email' field
        subject: "Company Status Update",
        text: `Dear ${newCompany.name}, your company has been registered successfully.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await companySchema.findOne({ email });
    if (!company) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (company?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else if (company?.status == "Pending") {
          res.json({
            success: false,
            message: "Your account has not been verified by the Admin!",
          });
        } else {
          const token = jwt.sign(company.id, secretKey);
          res.json({ success: true, message: "Login successfully", token });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const company = await companySchema.findById(req.company);
    if (!company) {
      console.log("Company not found");
      res.json({ success: false, message: "Company not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        company,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCategories = async (req, res) => {
  try {
    let check = await categorySchema.find({ status: "Active" });
    res.json({
      success: true,
      message: "Category fetched successfully",
      categories: check,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllServices = async (req, res) => {
  try {
    let check = await serviceSchema
      .find({ companyId: req.company })
      .populate("categoryId");
    res.json({
      success: true,
      message: "Category fetched successfully",
      services: check,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const insertService = async (req, res) => {
  try {
    const { title, categoryId, charge, description } = req.body;
    const picture = req?.file?.filename;
    const check = await serviceSchema.findOne({
      title,
      categoryId,
      companyId: req.company,
    });
    if (check) {
      res.json({ success: false, message: "Service already exists!" });
    } else {
      const service = await new serviceSchema({
        title,
        categoryId,
        picture,
        charge,
        description,
        companyId: req.company,
        status: "Available",
      }).save();
      res.json({ success: true, message: "Service inserted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateService = async (req, res) => {
  try {
    var check = await serviceSchema.findById(req.params.id);
    if (!check) {
      res.json({ success: false, message: "Service does not exists!" });
    } else {
      const { title, categoryId, charge, description, status } = req.body;
      const picture = req?.file?.filename;
      const updatedService = {};
      if (title) updatedService.title = title;
      if (categoryId) updatedService.categoryId = categoryId;
      if (picture) updatedService.picture = picture;
      if (charge) updatedService.charge = charge;
      if (description) updatedService.description = description;
      if (status) updatedService.status = status;
      service = await serviceSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedService },
        { new: true }
      );
      res.json({ success: true, message: "Service updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getBookingForService = async (req, res) => {
  try {
    let check = await bookingSchema
      .find()
      .populate("serviceId")
      .populate("customerId");
    const filtered = check.filter(
      (item) => item?.serviceId.companyId == req.company
    );
    res.json({
      success: true,
      message: "Category fetched successfully",
      bookings: filtered,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getSingleBooking = async (req, res) => {
  try {
    let check = await bookingSchema
      .findById(req.params.id)
      .populate("serviceId")
      .populate("customerId");
    if (!check) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      res.json({
        success: true,
        booking: check,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updateBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    } else {
      const data = req.body;
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: data,
        },
        { new: true }
      );
      res.json({ success: true, message: "Booking updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    } else {
      const { paymentStatus } = req.body;
      const updatedBooking = {};
      if (paymentStatus) {
        updatedBooking.paymentStatus = paymentStatus;
      }
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBooking,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Payment Status Updated successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getCounts = async (req, res) => {
  try {
    const services = await serviceSchema.find({ companyId: req.company });
    const AllBookings = await bookingSchema.find().populate("serviceId");
    const filtered = AllBookings.filter(
      (item) =>
        item?.serviceId?.companyId == req.company && item?.status == "Completed"
    );
    let revenue = 0;
    filtered.forEach((item) => {
      revenue += +item?.charge || 0;
    });
    res.json({
      success: true,
      services: services.length,
      bookings: filtered.length,
      revenue,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
module.exports = {
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
};
