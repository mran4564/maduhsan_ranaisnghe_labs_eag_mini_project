import { Request, Response } from 'express';
import ProductService from '../service/product.service';
import { ProductCreateDTO, ProductUpdateDTO } from '../model/product.model';

const productService = new ProductService();

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    const productDTO: ProductCreateDTO = req.body;

    try {
      const result = await productService.createProduct(productDTO);
      res.json(result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }

  // async getProducts(req: Request, res: Response): Promise<void> {
  //   try {
  //     const products = await productService.getProducts();
  //     res.status(200).json(products);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error retrieving products', error });
  //   }
  // }

  // async getProductById(req: Request, res: Response): Promise<void> {
  //   const productId: string = req.params.id;

  //   try {
  //     const product = await productService.getProductById(productId);

  //     if (product) {
  //       res.status(200).json(product);
  //     } else {
  //       res.status(404).json({ message: 'Product not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error retrieving product', error });
  //   }
  // }

  // async updateProduct(req: Request, res: Response): Promise<void> {
  //   const productId: string = req.params.id;
  //   const productDTO: ProductUpdateDTO = req.body;

  //   try {
  //     const updated = await productService.updateProduct(productId, productDTO);

  //     if (updated) {
  //       res.status(200).json({ message: 'Product updated successfully' });
  //     } else {
  //       res.status(404).json({ message: 'Product not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error updating product', error });
  //   }
  // }

  // async deleteProduct(req: Request, res: Response): Promise<void> {
  //   const productId: string = req.params.id;

  //   try {
  //     const deleted = await productService.deleteProduct(productId);

  //     if (deleted) {
  //       res.status(200).json({ message: 'Product deleted successfully' });
  //     } else {
  //       res.status(404).json({ message: 'Product not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error deleting product', error });
  //   }
  // }
}

export default ProductController;
