const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        
        const department = await prisma.department.create({
            data: {
                name
            }
        });

        return res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany();
        return res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const id  = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        const department = await prisma.department.findUnique({
            where: { id }
        });

        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }

        return res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        if (! await prisma.department.findUnique({ where: { id } })) {
            return res.status(404).json({ error: "Department not found" });
        }

        const department = await prisma.department.update({
            where: { id },
            data: { name }
        });

        return res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDepartment = async (req, res) => {  
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        if (! await prisma.department.findUnique({ where: { id } })) {
            return res.status(404).json({ error: "Department not found" });
        }

        const department = await prisma.department.delete({
            where: { id },
            select: {
                id: true,
                name: true
            }
        });

        return res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
