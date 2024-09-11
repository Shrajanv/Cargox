const adminSchema = require("../Models/Admin");
const companySchema = require("../Models/Company");
const customerSchema = require("../Models/Customer");
const categorySchema = require("../Models/Category");
const feedbackSchema = require("../Models/Feedback");
const bookingSchema = require("../Models/Booking");
const serviceSchema = require("../Models/Service");
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
    const { name, email, password } = req.body;
    const check = await adminSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
        username,
        email,
        password: hashedPassword,
      }).save();
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
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = jwt.sign(admin.id, secretKey);
        res.json({ success: true, message: "Login successfully", token });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companySchema.find();
    res.json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const insertCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const picture = req?.file?.filename;
    let check = await categorySchema.findOne({ title });
    if (check) {
      res.json({ success: false, message: "Category already exists" });
    } else {
      const category = new categorySchema({ title, picture, status: "Active" });
      await category.save();
      res.json({ success: true, message: "Category added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let check = await categorySchema.find();
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

const updateCategory = async (req, res) => {
  try {
    let check = await categorySchema.findById(req.params.id);
    if (check) {
      const { title, status } = req.body;
      const picture = req?.file?.filename;

      const updatedCategory = {};
      if (title) {
        updatedCategory.title = title;
      }
      if (status) {
        updatedCategory.status = status;
      }
      if (picture) {
        updatedCategory.picture = picture;
      }
      await categorySchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedCategory,
        },
        { new: true }
      );
      res.json({ success: true, message: "Category updated successfully" });
    } else {
      res.json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCompanyStatus = async (req, res) => {
  try {
    let check = await companySchema.findById(req.params.id);
    if (check) {
      const { status } = req.body;
      const updatedCompany = {};
      if (status) {
        updatedCompany.status = status;
      }

      await companySchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedCompany,
        },
        { new: true }
      );

      // Send email notification
      const mailOptions = {
        from: "shrajanv30@gmail.com",
        to: check.email, // Assuming the company's email is stored in the 'email' field
        subject: "Company Status Update",
        text: `Dear ${check.name}, your company status has been updated to: ${status}.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json({
        success: true,
        message: "Company status updated successfully",
      });
    } else {
      res.json({ success: false, message: "Company not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCustomerStatus = async (req, res) => {
  try {
    let check = await customerSchema.findById(req.params.id);
    if (check) {
      const { status } = req.body;
      const updatedCustomer = {};
      if (status) {
        updatedCustomer.status = status;
      }
      await customerSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedCustomer,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Client status updated successfully",
      });
    } else {
      res.json({ success: false, message: "Client not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackSchema.find();
    res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookingSchema
      .find()
      .populate("customerId")
      .populate({
        path: "serviceId",
        populate: {
          path: "companyId",
        },
      });
    const bookings = allBookings?.filter((item) => item?.status != "Cancelled");
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getCounts = async (req, res) => {
  try {
    const customers = await customerSchema.find({ status: "Active" });
    const companies = await companySchema.find({ status: "Active" });
    const services = await serviceSchema.find({ status: "Available" });
    const allBookings = await bookingSchema.find();
    const bookings = allBookings?.filter((item) => item?.status != "Cancelled");
    res.json({
      success: true,
      customers: customers.length,
      companies: companies.length,
      services: services.length,
      bookings: bookings.length,
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
  getAllCompanies,
  getAllCustomers,
  insertCategory,
  getAllCategories,
  updateCategory,
  updateCustomerStatus,
  updateCompanyStatus,
  getAllFeedbacks,
  getAllBookings,
  getCounts,
};
