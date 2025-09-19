import connectDB from "../_db.js";
import Customer from "../../app/models/Customer.js";
import auth from "../../app/middleware/auth.js";

export default async function handler(req, res) {
  await connectDB();

  try {
    await new Promise((resolve, reject) =>
      auth(req, res, (err) => (err ? reject(err) : resolve()))
    );

    const { id } = req.query;

    if (req.method === "GET") {
      const customer = await Customer.findById(id);
      if (!customer) return res.status(404).json({ message: "Not found" });
      return res.json(customer);
    }

    if (req.method === "PATCH") {
      const updated = await Customer.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.json(updated);
    }

    if (req.method === "DELETE") {
      const deleted = await Customer.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      return res.json({ message: "Deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
