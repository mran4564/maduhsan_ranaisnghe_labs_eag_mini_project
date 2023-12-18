import axios from 'axios';
import config from '../config/config';
import { CategoryCreateDto } from '../model/category.model';

class CategoryService {
  async createCategory(categoryCreateDTO: CategoryCreateDto) {
    const result = await axios.post(config.categoryApi, categoryCreateDTO);
    return result.data;
  }
  async getAll() {
    const response = await axios.get(config.categoryApi);
    return response.data;
  }
}

export default CategoryService;
