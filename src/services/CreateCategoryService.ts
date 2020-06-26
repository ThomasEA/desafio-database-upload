import { getCustomRepository } from "typeorm";
import CategoryRepository from "../repositories/CategoryRepository";
import Category from "../models/Category";

interface Request {
    title: string;
}

class CreateCategoryService {

    public async execute({title}: Request) : Promise<Category> {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const existentCategory = await categoryRepository.findByTitle(title);

        if (existentCategory)
            return existentCategory;

        const newCategory = categoryRepository.create({title});

        const createdCategory = await categoryRepository.save(newCategory);

        return createdCategory;
    }

}

export default CreateCategoryService;