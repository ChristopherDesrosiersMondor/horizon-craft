import { injectable } from "inversify";
import { DBService } from "./db.service";

@injectable()
export class EquipmentsRepository {
    constructor(private readonly _dbContext: DBService){}

    async all() {
        return this._dbContext.equipments.find({})
    }

    async findOne(id: string) {
        return this._dbContext.equipments.findById(id)
    }

    async create({
        name
    }: {
        name: string
    }) {
        return this._dbContext.equipments.create({ name })
    }

    async deleteOne(id: string) {
        return this._dbContext.equipments.deleteOne({ _id: id })
    }
}