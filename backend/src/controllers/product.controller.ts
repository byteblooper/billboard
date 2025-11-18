import { Request, Response } from 'express';
import * as productService from '../services/product.service';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
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
};

// Get one product
export const getProductById = async (req: Request, res: Response) => {
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
};

// Create product
export const createProduct = async (req: Request, res: Response) => {
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
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
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
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
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
};
