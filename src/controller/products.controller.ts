import { NextFunction, Request, Response } from 'express';
import ProductService from '../service/product.service';
import { ProductCreateDTO, ProductUpdateDTO } from '../model/product.model';
import { UserRoleEnum } from '../model/auth.model';

const productService = new ProductService();

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productDTO: ProductCreateDTO = req.body;
    try {
      const result = (await productService.createProduct(productDTO)).data;
      res.status(201).json({ message: 'Product Created successfully', result });
    } catch (error: any) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await productService.getProducts(req);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productId: string = req.params.id;
    try {
      const product = await productService.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productId: string = req.params.id;
    const productDTO: ProductUpdateDTO = req.body;
    try {
      const data = await productService.updateProduct(productId, productDTO);
      if (data) {
        res.status(200).json({ message: 'Product updated successfully', data });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productId: string = req.params.id;
    try {
      const deleted = await productService.deleteProduct(productId);
      if (deleted) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
