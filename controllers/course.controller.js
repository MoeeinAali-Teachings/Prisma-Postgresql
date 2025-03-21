const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const createCourse = async (req, res) => {
    try {
        const { name, description, capacity, departmentId } = req.body;

        if (!name || !description || !departmentId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!await prisma.department.findUnique({ where: { id: departmentId } })) {
            return res.status(404).json({ error: "Department not found" });
        }

        const course = await prisma.course.create({
            data: {
                name,
                description,
                capacity,
                departmentId
            }
        });

        return res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        return res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, capacity } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        if (!await prisma.course.findUnique({ where: { id } })) {
            return res.status(404).json({ error: "Course not found" });
        }

        const updatedCourse = await prisma.course.update({
            where: { id },
            data: { name, description, capacity }
        });

        return res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }

        if (!await prisma.course.findUnique({ where: { id } })) {
            return res.status(404).json({ error: "Course not found" });
        }

        const deletedCourse = await prisma.course.delete({
            where: { id },
            select: {
                id: true,
                name: true
            }
        });
        return res.status(200).json(deletedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}

