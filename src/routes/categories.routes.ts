import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';
import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoryRepository from '../repositories/CategoryRepository';

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const categories = await categoryRepository.find();

    return response.status(200).json(categories);
})

categoriesRoutes.post('/', async (request, response) => {
    const {title} = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({title});

    return response.status(200).json(category);
})

export default categoriesRoutes;