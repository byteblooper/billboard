import { Router, Request, Response } from 'express';
import * as userService from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const user = await userService.updateUser(id, name, email);
    res.json({
      success: true,
      message: 'User updated',
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    
    res.json({
      success: true,
      message: 'User deleted',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
