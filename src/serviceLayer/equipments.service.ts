import { EquipmentsRepository } from "@/dataAccessLayer/equipments.repository";
import { readODSAndConvertToJson } from "@/helpers/sheetReader";
import { injectable } from "inversify";

@injectable()
export class EquipmentsService {
    constructor(
        private readonly _equimentsRepo: EquipmentsRepository
    ){}

    async create(payload: any) {
        return this._equimentsRepo.create(payload)
    }

    async all() {
        return this._equimentsRepo.all()
    }

    async show(id: string) {
        return this._equimentsRepo.findOne(id)
    }

    async delete(id: string) {
        return this._equimentsRepo.deleteOne(id)
    }

    async updateEquipmentSource() {
        const resultCode = await readODSAndConvertToJson('src/output/equipments.xlsx', 'src/output/')
        return resultCode
    }
}