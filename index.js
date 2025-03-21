const express = require("express");
const departmentRoutes = require("./routes/department.route");
const courseRoutes = require("./routes/course.route");

const app = express();

app.use(express.json());

app.use("/departments", departmentRoutes);
app.use("/courses", courseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


