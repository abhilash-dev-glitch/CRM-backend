import connectDB from "../_db.js";
import Case from "../../app/models/Case.js";
import auth from "../../app/middleware/auth.js";

export default async function handler(req, res) {
  await connectDB();

  try {
    await new Promise((resolve, reject) =>
      auth(req, res, (err) => (err ? reject(err) : resolve()))
    );

    if (req.method === "GET") {
      const cases = await Case.find()
        .limit(100)
        .populate("customer_id")
        .populate("assigned_to", "username");
      return res.json(cases);
    }

    if (req.method === "POST") {
      const { customer_id, title, description, priority, assigned_to } = req.body;
      if (!customer_id || !title)
        return res.status(400).json({ message: "customer_id and title required" });

      const c = new Case({ customer_id, title, description, priority, assigned_to });
      await c.save();
      return res.status(201).json(c);
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
