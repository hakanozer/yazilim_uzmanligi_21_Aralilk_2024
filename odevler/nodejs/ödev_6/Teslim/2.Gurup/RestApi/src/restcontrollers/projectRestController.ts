import express from "express";
import { AuthRequest, verifyToken, checkRole } from "../configs/auth";
import { eRoles } from "../utils/eRoles";
import { ProjectService } from "../services/projectService";
import { JwtPayload } from "jsonwebtoken";

const projectRestController = express.Router()
const projectService = new ProjectService()

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - startDate
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated project id
 *         name:
 *           type: string
 *           description: Project name
 *           example: "AI Research System"
 *         description:
 *           type: string
 *           description: Project details
 *           example: "This project focuses on machine learning models..."
 *         startDate:
 *           type: string
 *           format: date
 *           description: Project start date (ISO)
 *           example: "2025-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Project end date (ISO)
 *           example: "2025-02-01"
 *         status:
 *           type: string
 *           enum: ["Planned", "In Progress", "Completed"]
 *           description: Current status
 *           example: "Planned"
 *         createdBy:
 *           type: string
 *           description: Creator user id
 *         teamMembers:
 *           type: array
 *           items:
 *             type: string
 *           description: Team member user ids
 */

/**
 * @swagger
 * /projects/add:
 *   post:
 *     summary: Create new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *           example:
 *             name: "Projex"
 *             description: "Test project"
 *             startDate: "2025-01-01"
 *             status: "Planned"
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error (missing required fields)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin veya ProjectManager rolü gerekli)
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 */
projectRestController.post(
    "/add",
    verifyToken,
    checkRole(eRoles.Admin, eRoles.ProjectManager),
    async (req: AuthRequest, res) => {
        try {
            const user = req.user as JwtPayload;
            const projectData = req.body;
            const result = await projectService.createProject(projectData, user.id);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
);

/**
 * @swagger
 * /projects/update/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *           example:
 *             name: "Projex Updated"
 *             description: "Updated details"
 *             endDate: "2025-02-01"
 *             status: "In Progress"
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid project ID or payload
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin veya ProjectManager rolü gerekli)
 *       404:
 *         description: Project not found
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 */
projectRestController.put("/update/:id", verifyToken, checkRole(eRoles.Admin, eRoles.ProjectManager), async (req: AuthRequest, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const result = await projectService.updateProject(id, updateData);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
);

/**
 * @swagger
 * /projects/delete/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (yalnızca Admin rolü)
 *       404:
 *         description: Project not found
 *     x-roles:
 *       - Admin
 */
projectRestController.delete("/delete/:id", verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
        try {
            const { id } = req.params;
            const result = await projectService.deleteProject(id);
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
);

/**
 * @swagger
 * /projects/list:
 *   get:
 *     summary: List all projects (paginated)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of projects
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin, ProjectManager veya Developer rolleri gerekli)
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 *       - Developer
 */
projectRestController.get(
    "/list",
    verifyToken,
    checkRole(eRoles.Admin, eRoles.ProjectManager, eRoles.Developer),
    async (req, res) => {
        try {
            const result = await projectService.getAllProjects();
            return res.status(result.code).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
);

export default projectRestController
