import { Response, Router } from "express";
import { createProject, getProjects, updateProject, deleteProject, getProjectById } from "../services/projectService";
import { verifyToken, isManagement, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { eRoles } from "../utils/eRoles";

const projectController = Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     tags: [Project Management]
 *     summary: Create new project (Admin & Project Manager only)
 *     description: Create a new project. Only accessible by Admin and Project Manager.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "E-commerce Website"
 *               description:
 *                 type: string
 *                 example: "Develop a new e-commerce platform"
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["68ea6182bb0e704b14b3f654"]
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-01"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin or Project Manager role required
 *       500:
 *         description: Internal server error
 */
projectController.post("/", verifyToken, isManagement, async (req: AuthenticatedRequest, res: Response) => {
  const result = await createProject(req.body, req.user!.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /projects:
 *   get:
 *     tags: [Project Management]
 *     summary: Get all projects
 *     description: Retrieve projects. Admin sees all, others see only their projects.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       500:
 *         description: Internal server error
 */
projectController.get("/", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  // Admin tüm projeleri görür, diğerleri sadece kendi projelerini
  const userId = req.user!.roles.includes(eRoles.Admin) ? undefined : req.user!.id; // eRoles.Admin kullan
  const result = await getProjects(userId);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     tags: [Project Management]
 *     summary: Update project (Admin & Project Manager only)
 *     description: Update project details. Only accessible by Admin and Project Manager.
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
 *         "application/json":
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, on-hold]
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin or Project Manager role required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectController.patch("/:id", verifyToken, isManagement, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const result = await updateProject(id, req.body, req.user!.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags: [Project Management]
 *     summary: Delete project (Admin & Project Manager only)
 *     description: Delete a project. Only accessible by Admin and Project Manager.
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
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       403:
 *         description: Forbidden - Admin or Project Manager role required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectController.delete("/:id", verifyToken, isManagement, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const result = await deleteProject(id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags: [Project Management]
 *     summary: Get project by ID
 *     description: Retrieve a specific project by ID.
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
 *         description: Project retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectController.get("/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const result = await getProjectById(id);
  res.status(result.code).json(result);
});

export default projectController;