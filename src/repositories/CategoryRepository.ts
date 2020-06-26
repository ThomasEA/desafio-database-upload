import { EntityRepository, Repository } from "typeorm";
import Category from "../models/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {

    public async findByTitle(title: string) : Promise<Category | undefined> {
        const category = await this.findOne({
            where: { title }
        });

        return category;
    }

}

export default CategoryRepository;