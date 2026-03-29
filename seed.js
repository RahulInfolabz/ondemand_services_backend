const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "ondemand_platform";

async function seed() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);

  console.log("🌱 Starting seed...");

  // ── Clear existing data ───────────────────────────────────────────────────
  await db.collection("users").deleteMany({});
  await db.collection("categories").deleteMany({});
  await db.collection("services").deleteMany({});
  await db.collection("bookings").deleteMany({});
  await db.collection("payments").deleteMany({});
  await db.collection("feedbacks").deleteMany({});

  console.log("🗑️  Cleared existing collections");

  // ── Users ─────────────────────────────────────────────────────────────────
  const usersResult = await db.collection("users").insertMany([
    {
      name: "Admin User",
      email: "admin@ondemand.com",
      phone: "9900000001",
      address: "101, Business Hub, Ahmedabad",
      password: "Admin@123",
      role: "Admin",
      status: "Active",
      profile_image: "",
      created_at: new Date(),
    },
    {
      name: "Karan Mehta",
      email: "karan@gmail.com",
      phone: "9900000002",
      address: "22, Satellite Road, Ahmedabad",
      password: "Karan@123",
      role: "User",
      status: "Active",
      profile_image: "",
      created_at: new Date(),
    },
    {
      name: "Priti Shah",
      email: "priti@gmail.com",
      phone: "9900000003",
      address: "45, Vastrapur Lake Road, Ahmedabad",
      password: "Priti@123",
      role: "User",
      status: "Active",
      profile_image: "",
      created_at: new Date(),
    },
  ]);

  const userIds = Object.values(usersResult.insertedIds);
  console.log("✅ Users seeded");

  // ── Categories ────────────────────────────────────────────────────────────
  const categoriesResult = await db.collection("categories").insertMany([
    {
      name: "Home Renovation & Remodeling",
      description: "Professional home renovation services including flooring, painting, and structural modifications.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
    {
      name: "Electrical Services",
      description: "Expert electrical services for residential and commercial properties.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
    {
      name: "Plumbing Services",
      description: "Reliable plumbing solutions for all types of water and drainage issues.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
    {
      name: "Cleaning Services",
      description: "Professional deep cleaning and housekeeping services for homes and offices.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
    {
      name: "Appliance Repair",
      description: "Fast and reliable repair services for all home appliances.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
    {
      name: "Pest Control",
      description: "Safe and effective pest control treatments for residential and commercial spaces.",
      image: "",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const categoryIds = Object.values(categoriesResult.insertedIds);
  console.log("✅ Categories seeded");

  // ── Services ──────────────────────────────────────────────────────────────
  const servicesResult = await db.collection("services").insertMany([
    // Home Renovation
    {
      category_id: categoryIds[0],
      name: "Wooden Flooring",
      description: "Premium wooden flooring installation for living rooms, bedrooms, and offices with durable finish.",
      image: "",
      price: 4999.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0],
      name: "Interior Wall Painting",
      description: "Professional interior wall painting with premium quality paints, including surface preparation.",
      image: "",
      price: 3499.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0],
      name: "False Ceiling Installation",
      description: "Modern false ceiling designs with LED lighting integration for homes and offices.",
      image: "",
      price: 6999.0,
      status: "Active",
      created_at: new Date(),
    },
    // Electrical
    {
      category_id: categoryIds[1],
      name: "Home Wiring & Panel Work",
      description: "Complete home electrical wiring, panel installation, and safety inspection.",
      image: "",
      price: 2499.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1],
      name: "CCTV Installation",
      description: "Professional CCTV camera installation with remote monitoring setup.",
      image: "",
      price: 1999.0,
      status: "Active",
      created_at: new Date(),
    },
    // Plumbing
    {
      category_id: categoryIds[2],
      name: "Bathroom Plumbing & Fitting",
      description: "Complete bathroom plumbing including pipe fitting, fixture installation, and leak repair.",
      image: "",
      price: 1799.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2],
      name: "Water Tank Cleaning",
      description: "Professional water tank cleaning and sanitization for overhead and underground tanks.",
      image: "",
      price: 999.0,
      status: "Active",
      created_at: new Date(),
    },
    // Cleaning
    {
      category_id: categoryIds[3],
      name: "Full Home Deep Cleaning",
      description: "Comprehensive deep cleaning of entire home including kitchen, bathrooms, and all rooms.",
      image: "",
      price: 2999.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3],
      name: "Sofa & Carpet Cleaning",
      description: "Professional sofa and carpet steam cleaning to remove stains, dust, and allergens.",
      image: "",
      price: 1499.0,
      status: "Active",
      created_at: new Date(),
    },
    // Appliance Repair
    {
      category_id: categoryIds[4],
      name: "AC Service & Repair",
      description: "Complete AC servicing including gas refilling, cleaning, and mechanical repair.",
      image: "",
      price: 799.0,
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[4],
      name: "Washing Machine Repair",
      description: "Expert repair for all brands of washing machines including front-load and top-load.",
      image: "",
      price: 599.0,
      status: "Active",
      created_at: new Date(),
    },
    // Pest Control
    {
      category_id: categoryIds[5],
      name: "General Pest Control",
      description: "Comprehensive pest control treatment for cockroaches, ants, and common household pests.",
      image: "",
      price: 1299.0,
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const serviceIds = Object.values(servicesResult.insertedIds);
  console.log("✅ Services seeded");

  // ── Bookings ──────────────────────────────────────────────────────────────
  const bookingsResult = await db.collection("bookings").insertMany([
    {
      user_id: userIds[1], // Karan
      service_id: serviceIds[0], // Wooden Flooring
      booking_datetime: new Date("2025-12-10T10:00:00"),
      start_datetime: new Date("2025-12-10T09:00:00"),
      complete_datetime: new Date("2025-12-10T13:00:00"),
      status: "Completed",
      payment_status: "Success",
      amount: 4999.0,
      created_at: new Date("2025-12-08"),
    },
    {
      user_id: userIds[2], // Priti
      service_id: serviceIds[7], // Full Home Deep Cleaning
      booking_datetime: new Date("2025-12-15T14:00:00"),
      start_datetime: new Date("2025-12-15T14:00:00"),
      complete_datetime: null,
      status: "Ongoing",
      payment_status: "Success",
      amount: 2999.0,
      created_at: new Date("2025-12-13"),
    },
    {
      user_id: userIds[1], // Karan
      service_id: serviceIds[9], // AC Service
      booking_datetime: new Date("2025-12-20T11:00:00"),
      start_datetime: null,
      complete_datetime: null,
      status: "Ongoing",
      payment_status: "Pending",
      amount: 799.0,
      created_at: new Date(),
    },
  ]);

  const bookingIds = Object.values(bookingsResult.insertedIds);
  console.log("✅ Bookings seeded");

  // ── Payments ──────────────────────────────────────────────────────────────
  await db.collection("payments").insertMany([
    {
      user_id: userIds[1],
      booking_id: bookingIds[0],
      payment_type: "Razorpay",
      payment_date: new Date("2025-12-08"),
      amount: 4999.0,
      transaction_id: "pay_demo_001",
      razorpay_order_id: "order_demo_001",
      razorpay_signature: "sig_demo_001",
      status: "Success",
    },
    {
      user_id: userIds[2],
      booking_id: bookingIds[1],
      payment_type: "Razorpay",
      payment_date: new Date("2025-12-13"),
      amount: 2999.0,
      transaction_id: "pay_demo_002",
      razorpay_order_id: "order_demo_002",
      razorpay_signature: "sig_demo_002",
      status: "Success",
    },
  ]);

  console.log("✅ Payments seeded");

  // ── Feedbacks ─────────────────────────────────────────────────────────────
  await db.collection("feedbacks").insertMany([
    {
      user_id: userIds[1],
      booking_id: bookingIds[0],
      service_id: serviceIds[0],
      rating: 5.0,
      feedback: "Very good service and affordable price. The wooden flooring looks amazing!",
      datetime: new Date("2025-12-10"),
    },
    {
      user_id: userIds[2],
      booking_id: bookingIds[1],
      service_id: serviceIds[7],
      rating: 4.5,
      feedback: "Excellent deep cleaning service. The team was professional and thorough.",
      datetime: new Date("2025-12-15"),
    },
  ]);

  console.log("✅ Feedbacks seeded");

  console.log("\n🎉 Seed completed successfully!");
  console.log("────────────────────────────────────────────");
  console.log("👤 Admin   → admin@ondemand.com  / Admin@123");
  console.log("👤 User 1  → karan@gmail.com     / Karan@123");
  console.log("👤 User 2  → priti@gmail.com     / Priti@123");
  console.log("────────────────────────────────────────────");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
