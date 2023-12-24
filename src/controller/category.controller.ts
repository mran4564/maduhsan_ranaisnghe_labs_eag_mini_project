import { NextFunction, Request, Response } from 'express';
import { CategoryCreateDto } from '../model/category.model';
import CategoryService from '../service/category.service';

const categoryService = new CategoryService();

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const categoryCreateDTO: CategoryCreateDto = req.body;
    try {
      const result = await categoryService.createCategory(categoryCreateDTO);
      res.status(201).json({ message: 'Category Created successfully', result });
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await categoryService.getAll();
      res.status(200).json({ content: data });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
