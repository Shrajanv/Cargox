const customerSchema = require("../Models/Customer");
const feedbackSchema = require("../Models/Feedback");
const categorySchema = require("../Models/Category");
const serviceSchema = require("../Models/Service");
const bookingSchema = require("../Models/Booking");

const secretKey = "cargoEx";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const check = await customerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await new customerSchema({
        name,
        email,
        phone,
        password: hashedPassword,
        status: "Active",
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
    const customer = await customerSchema.findOne({ email });
    if (!customer) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (customer?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else {
          const token = jwt.sign(customer.id, secretKey);
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
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const submitContactFeedback = (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contactFeedback = new feedbackSchema({
      name,
      email,
      message,
    }).save();
    res.json({
      success: true,
      message: "Feedback submitted successfully",
    });
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
const viewAllServices = async (req, res) => {
  try {
    let check = await serviceSchema
      .find()
      .populate("categoryId")
      .populate("companyId");
    res.json({
      success: true,
      message: "Services fetched successfully",
      services: check,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewSingleService = async (req, res) => {
  try {
    let check = await serviceSchema
      .findById(req.params.id)
      .populate("categoryId")
      .populate("companyId");
    if (!check) {
      res.json({ success: false, message: "service not found!" });
    } else {
      res.json({
        success: true,
        service: check,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const bookService = async (req, res) => {
  try {
    const {
      senderName,
      senderContact,
      pickupLocation,
      pickupLocationLink,
      pickupCountry,
      receiverName,
      receiverContact,
      deliveryLocation,
      deliveryLocationLink,
      deliveryCountry,
      itemDescription,
      overAllWeight,
      message,
      charge,
      pickupDate,
      serviceId,
    } = req.body;
    const customerId = req.customer;
    const packagePicture = req?.files?.packagePicture[0]?.filename;
    const document = req?.files?.document[0]?.filename;
    const status = "Pending";
    const newBooking = await new bookingSchema({
      senderName,
      senderContact,
      pickupLocation,
      pickupLocationLink,
      pickupCountry,
      receiverName,
      receiverContact,
      deliveryLocation,
      deliveryLocationLink,
      deliveryCountry,
      itemDescription,
      overAllWeight,
      packagePicture,
      document,
      message,
      charge,
      pickupDate,
      serviceId,
      customerId,
      status,
    }).save();
    res.json({
      success: true,
      message:
        "Your request has been sent to the company, check the status to know more!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingSchema
      .find({
        customerId: req.customer,
      })
      .populate({
        path: "serviceId",
        populate: {
          path: "companyId",
          model: "company",
        },
      });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const cancelBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    } else {
      const updatedBooking = {};
      updatedBooking.status = "Cancelled";
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBooking,
        },
        { new: true }
      );
      res.json({ success: true, message: "Booking has been cancelled" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const payForBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    } else {
      const { paymentStatus, transactionId } = req.body;
      const updatedBooking = {};
      if (paymentStatus) {
        updatedBooking.paymentStatus = paymentStatus;
      }
      if (transactionId) {
        updatedBooking.transactionId = transactionId;
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
        message: "Payment has been initiated successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const feedbackForBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    } else {
      const { feedback } = req.body;
      const updatedBooking = {};
      if (feedback) {
        updatedBooking.feedback = feedback;
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
        message: "Feedback submitted successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

module.exports = {
  Register,
  Login,
  getProfile,
  submitContactFeedback,
  getAllCategories,
  viewAllServices,
  viewSingleService,
  bookService,
  getBookings,
  cancelBooking,
  payForBooking,
  feedbackForBooking,
};
