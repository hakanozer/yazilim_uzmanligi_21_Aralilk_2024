import express from "express";
import { verifyToken, checkRole, AuthRequest } from "../configs/auth";
import { eRoles } from "../utils/eRoles";
import TaskService from "../services/taskService";

const taskRestController = express.Router();
const taskService = new TaskService();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management under projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *           example: "Implement login flow"
 *         description:
 *           type: string
 *           example: "Add JWT login and refresh tokens"
 *         status:
 *           type: string
 *           enum: ["Todo", "InProgress", "Done"]
 *           example: "Todo"
 *         project:
 *           type: string
 *           description: Project ID
 *         assignedTo:
 *           type: string
 *           description: User ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     TaskCreateRequest:
 *       type: object
 *       required:
 *         - title
 *         - assignedTo
 *       properties:
 *         title:
 *           type: string
 *           example: "Create project details page"
 *         description:
 *           type: string
 *           example: "Render project attributes and team info"
 *         assignedTo:
 *           type: string
 *           description: User ID to assign
 *           example: "665f9c8e3a6d2a00123abcd0"
 *         status:
 *           type: string
 *           enum: ["Todo", "InProgress", "Done"]
 *           example: "Todo"
 *     TaskStatusUpdateRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: ["Todo", "InProgress", "Done"]
 *           example: "InProgress"
 *     TasksListResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Tasks fetched successfully"
 *         data:
 *           type: object
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             pagination:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 hasNext:
 *                   type: boolean
 *                 hasPrev:
 *                   type: boolean
 */

/**
 * @swagger
 * /projects/{id}/tasks:
 *   post:
 *     summary: Create a new task under a project
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/TaskCreateRequest'
 *           example:
 *             title: "Setup CI pipeline"
 *             description: "Configure GitHub Actions for tests"
 *             assignedEmail: "ProjectManager@example.com"
 *             status: "Todo"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error or invalid IDs
 *       404:
 *         description: Project or assigned user not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin veya ProjectManager)
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 */
taskRestController.post(
  "/projects/:id/tasks",
  verifyToken,
  checkRole(eRoles.Admin, eRoles.ProjectManager),
  async (req: AuthRequest, res) => {
    const projectId = req.params.id;
    const result = await taskService.createTask(projectId, req.body);
    return res.status(result.code).json(result);
  }
);

/**
 * @swagger
 * /projects/{id}/tasks:
 *   get:
 *     summary: List tasks of a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Tasks listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TasksListResponse'
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin, ProjectManager veya Developer)
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 *       - Developer
 */
taskRestController.get(
  "/projects/:id/tasks",
  verifyToken,
  checkRole(eRoles.Admin, eRoles.ProjectManager, eRoles.Developer),
  async (req, res) => {
    const projectId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await taskService.getTasksByProject(projectId, page, limit);
    return res.status(result.code).json(result);
  }
);

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskStatusUpdateRequest'
 *           example:
 *             status: "InProgress"
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task ID or status value
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin, ProjectManager veya Developer)
 *     x-roles:
 *       - Admin
 *       - ProjectManager
 *       - Developer
 */
taskRestController.patch(
  "/tasks/:id/status",
  verifyToken,
  checkRole(eRoles.Admin, eRoles.ProjectManager, eRoles.Developer),
  async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body as { status: string };
    const result = await taskService.updateTaskStatus(taskId, status);
    return res.status(result.code).json(result);
  }
);

export default taskRestController;