const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function BookService(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth || user.session.role !== "User") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { service_id, booking_datetime } = req.body;

    if (!service_id || !booking_datetime) {
      return res.status(400).json({
        success: false,
        message: "Service ID and booking datetime are required",
      });
    }

    if (!ObjectId.isValid(service_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const db = await connectDB();
    const serviceCollection = db.collection("services");
    const bookingCollection = db.collection("bookings");

    // Verify service exists and is active
    const service = await serviceCollection.findOne({
      _id: new ObjectId(service_id),
      status: "Active",
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await bookingCollection.insertOne({
      user_id: new ObjectId(user.session._id),
      service_id: new ObjectId(service_id),
      booking_datetime: new Date(booking_datetime),
      start_datetime: null,       // Admin will assign
      complete_datetime: null,    // Admin will assign
      status: "Ongoing",
      payment_status: "Pending",
      amount: service.price,
      created_at: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Service booked successfully",
    });
  } catch (error) {
    console.error("BookService.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { BookService };
