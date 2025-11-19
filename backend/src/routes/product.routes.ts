import { Router, Request, Response } from 'express';
import * as productService from '../services/product.service';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE product (POST /products)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const product = await productService.createProduct(name, description, price, category, stock, imageUrl);
    
    res.status(201).json({
      success: true,
      message: 'Product created',
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE product
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    const product = await productService.updateProduct(id, name, description, price, category, stock, imageUrl);
    res.json({
      success: true,
      message: 'Product updated',
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE product
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    
    res.json({
      success: true,
      message: 'Product deleted',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
