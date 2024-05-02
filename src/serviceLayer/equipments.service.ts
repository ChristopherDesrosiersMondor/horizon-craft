import { PROJECT_ROOT_DIR } from "@/bootstrap";
import { EquipmentsRepository } from "@/dataAccessLayer/equipments.repository";
import { seedEquipmentsToDb } from "@/helpers/seedEquipment";
import { readODSAndConvertToJson } from "@/helpers/sheetReader";
import { injectable } from "inversify";
import * as path from 'path'; 

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

    async allByCategory(category: string){
        return this._equimentsRepo.allByCategory(category)
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

    async seedEquipments() {
        const filePath = path.join(PROJECT_ROOT_DIR, "src/output", "equipments.json")
        await seedEquipmentsToDb(filePath, this)
    }
}