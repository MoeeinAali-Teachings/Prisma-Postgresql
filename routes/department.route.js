const router = require("express").Router();
const { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } = require("../controllers/department.controller");

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
