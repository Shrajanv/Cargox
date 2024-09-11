const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
    senderName: {
      type: String,
      require: true,
    },
    senderContact: {
      type: String,
      require: true,
    },
    pickupLocation: {
      type: String,
      require: true,
    },
    pickupLocationLink: {
      type: String,
      require: true,
    },
    pickupCountry: {
      type: String,
      require: true,
    },
    receiverName: {
      type: String,
      require: true,
    },
    receiverContact: {
      type: String,
      require: true,
    },
    deliveryLocation: {
      type: String,
      require: true,
    },
    deliveryLocationLink: {
      type: String,
      require: true,
    },
    deliveryCountry: {
      type: String,
      require: true,
    },
    itemDescription: {
      type: String,
      require: true,
    },
    overAllWeight: {
      type: String,
      require: true,
    },
    packagePicture: {
      type: String,
      require: true,
    },
    document: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    charge: {
      type: String,
      require: true,
    },
    pickupDate: {
      type: String,
      require: true,
    },
    expectedDeliveryDate: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    response: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    paymentStatus: {
      type: String,
      require: true,
    },
    feedback: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("booking", bookingSchema);
