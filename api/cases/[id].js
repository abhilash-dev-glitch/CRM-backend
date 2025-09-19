import connectDB from "../_db.js";
import Case from "../../app/models/Case.js";
import auth from "../../app/middleware/auth.js";

export default async function handler(req, res) {
  await connectDB();

  try {
    await new Promise((resolve, reject) =>
      auth(req, res, (err) => (err ? reject(err) : resolve()))
    );

    const { id } = req.query;

    if (req.method === "GET") {
      const c = await Case.findById(id)
        .populate("customer_id")
        .populate("assigned_to", "username");
      if (!c) return res.status(404).json({ message: "Case not found" });
      return res.json(c);
    }

    if (req.method === "PATCH") {
      const c = await Case.findByIdAndUpdate(id, req.body, { new: true });
      if (!c) return res.status(404).json({ message: "Case not found" });
      return res.json(c);
    }

    if (req.method === "DELETE") {
      const c = await Case.findByIdAndDelete(id);
      if (!c) return res.status(404).json({ message: "Case not found" });
      return res.json({ message: "Deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
