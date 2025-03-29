import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { search } = req.query;
  const filePath = path.join(process.cwd(), "data", "books.json");
  const books = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(search?.toLowerCase() || ""));

  res.status(200).json(filteredBooks);
}
