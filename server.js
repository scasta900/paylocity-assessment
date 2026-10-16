const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const items = [
	
]

app.route("/api/example")
  .get((req, res) => {
    res.json({ results: items });
  })

  .post((req,res) => {
    const temp = Array.isArray(req.body)
      ? req.body
      : [req.body];
   
    if (temp.length === 0) {
      return res.status(400).json({  error: "There must be at least one item in the POST request" });
    }

    const flag = temp.every(item =>
      typeof item.name === "string" &&
      (item.name).trim() &&
      typeof item.type === "string" &&
      (item.type).trim() && 
      typeof item.description === "string" &&
      (item.description).trim() &&
      typeof item.date === "string" &&
      (item.date).trim() &&
      (/^\d{4}-\d{2}-\d{2}$/).test(item.date)
    );

    if (!flag) {
      return res.status(400).json({ error: "Error in the values! Check the formatting and every value must be a non-empty string" });
    }

    const append = temp.map(item => ({
      name: item.name,
      type: item.type,
      description: item.description,
      date: item.date
    }));

    items.push(...append);

    res.status(201).json({
      message: "Added entries successfully",
      results: append
    });
  });

app.listen(port, () => {
  console.log("Server running at http://localhost:${port}");
});
