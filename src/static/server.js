const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// app.use("/public", express.static(path.join(__dirname, "public")));

// app.get("/public/something", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "something.html"));
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
