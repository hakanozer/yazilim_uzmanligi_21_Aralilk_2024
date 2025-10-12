import  { Response } from "express";
import { AuthRequest, requireAdmin, verifyToken } from "../middlewares/authMiddleware";
import { Project } from "../models/projectModel";
import express from "express";
import { updateProject, deleteProject } from "../services/projectServices";

// Create a new project
  const projectController = express.Router();

  // Swagger documentation
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management and retrieval
 */

/**
 * @swagger
 * /projects/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string

 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /projects/list:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /projects/update/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string

 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /projects/delete/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

// Debug middleware
projectController.use((req, res, next) => {
    console.log(`Project Route: ${req.method} ${req.path}`);
    next();
});

// Create a new project
projectController.post('/create', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) =>  {
   try {
    const result = await projectservices.createProject(req.body);
    return res.status(result.code).json(result);
   } catch (error) {
    return res.status(500).json({
        code: 500,
        status: false,
        message: 'Sunucu hatası',
        error: error
    });
   }
})

// Get all projects
projectController.get('/list', async (req: AuthRequest, res: Response) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects", error: err });
    }
});

// Update a project
projectController.put('/update/:id', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const result = await updateProject(id, req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// Delete a project
projectController.delete('/delete/:id', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const result = await projectservices.deleteProject(id);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error: error
        });
    }
});

// createProject service used by the /create route
async function createProject(data: any) {
    try {
        const project = new Project(data);
        await project.save();
        return {
            code: 201,
            status: true,
            message: 'Proje oluşturuldu',
            project
        };
    } catch (error) {
        return {
            code: 500,
            status: false,
            message: 'Sunucu hatası',
            error
        };
    }
}

// Default export
const projectservices = {
    createProject,
    updateProject,
    deleteProject

};

export default projectController;
