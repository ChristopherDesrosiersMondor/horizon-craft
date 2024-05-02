import { injectable } from "inversify";
import { DBService } from "./db.service";
import { TransformedEquipment } from "@/helpers/seedEquipment";

@injectable()
export class EquipmentsRepository {
    constructor(private readonly _dbContext: DBService){}

    async all() {
        return this._dbContext.equipments.find({})
    }

    async allByCategory(category: string) {
        return this._dbContext.equipments.find({
            category: category
        });
    }

    async findOne(id: string) {
        return this._dbContext.equipments.findById(id)
    }

    async create(equipment: TransformedEquipment) {
        return this._dbContext.equipments.create(equipment)
    }

    async deleteOne(id: string) {
        return this._dbContext.equipments.deleteOne({ _id: id })
    }
}