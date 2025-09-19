import connectDB from "../_db.js";
import Customer from "../../app/models/Customer.js";
import auth from "../../app/middleware/auth.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    // list customers
    const customers = await Customer.find().limit(100);
    return res.json(customers);
  }

  if (req.method === "POST") {
    // create new customer
    try {
      await new Promise((resolve, reject) =>
        auth(req, res, (err) => (err ? reject(err) : resolve()))
      );

      const { name, contact_info } = req.body;
      if (!name) return res.status(400).json({ message: "Customer name required" });

      const customer = new Customer({ name, contact_info });
      await customer.save();

      return res.status(201).json(customer);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
