import { Response, Router } from "express";
import { createTask, getTasksByProject, updateTaskStatus, getTaskById } from "../services/taskService";
import { verifyToken, isManagement, anyRole, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { eRoles } from "../utils/eRoles";

const taskController = Router();

/**
 * @swagger
 * /projects/{id}/tasks:
 *   post:
 *     tags: [Task Management]
 *     summary: Create new task (Admin & Project Manager only)
 *     description: Create a new task in a project. Only accessible by Admin and Project Manager.
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
 *             required:
 *               - title
 *               - description
 *               - assignedTo
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Implement user authentication"
 *               description:
 *                 type: string
 *                 example: "Create login and register functionality"
 *               assignedTo:
 *                 type: string
 *                 example: "68ea6182bb0e704b14b3f655"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "high"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-01"
 *     responses:
 *       201:
 *         description: Task created successfully
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
taskController.post("/projects/:id/tasks", verifyToken, isManagement, async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.params.id;
  const taskData = {
    ...req.body,
    project: projectId
  };
  const result = await createTask(taskData, req.user!.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /projects/{id}/tasks:
 *   get:
 *     tags: [Task Management]
 *     summary: Get tasks by project
 *     description: Retrieve tasks for a specific project. Admin sees all, others see only their tasks.
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
 *         description: Tasks retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       500:
 *         description: Internal server error
 */
taskController.get("/projects/:id/tasks", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.params.id;
  // Admin tüm task'ları görür, diğerleri sadece kendi task'larını
  const userId = req.user!.roles.includes(eRoles.Admin) ? undefined : req.user!.id; // eRoles.Admin kullan
  const result = await getTasksByProject(projectId, userId);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     tags: [Task Management]
 *     summary: Update task status
 *     description: Update task status. Accessible by all authenticated users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, review, completed]
 *                 example: "in-progress"
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
taskController.patch("/tasks/:id/status", verifyToken, anyRole, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await updateTaskStatus(id, status, req.user!.id);
  res.status(result.code).json(result);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags: [Task Management]
 *     summary: Get task by ID
 *     description: Retrieve a specific task by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           "application/json":
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - Token required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
taskController.get("/tasks/:id", verifyToken, anyRole, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const result = await getTaskById(id);
  res.status(result.code).json(result);
});

export default taskController;