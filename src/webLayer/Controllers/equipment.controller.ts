import { Request, Response } from 'express';
import { EquipmentsService } from '@/serviceLayer/equipments.service';
import { controller, httpDelete, httpGet, httpMethod, httpPost } from 'inversify-express-utils'

@controller('/equipments')
export class EquipmentController {
    constructor(private readonly _equipmentsService: EquipmentsService){}

    @httpGet('/')
    async index(req: Request, res: Response) {
        const equipments = await this._equipmentsService.all()
        return {
            data: equipments,
        }
    }

    @httpGet('/:id')
    async show(req: Request, res: Response) {
        const equipmentId = req.params.id
        const equipment = await this._equipmentsService.show(equipmentId)
        return {
            data: equipment,
        }
    }

    @httpGet('/source/update')
    async updateSource(req: Request, res: Response) {
        const resultCode = await this._equipmentsService.updateEquipmentSource()
        res.sendStatus(resultCode)
    }

    @httpPost('/')
    async store(req: Request, res: Response) {
        const equipment = await this._equipmentsService.create(req.body)

        return res.sendStatus(201).json({
            data: equipment
        })
    }

    @httpDelete('/:id')
    async destroy(req: Request, res: Response){
        await this._equipmentsService.delete(req.params.id)

        res.sendStatus(204)
    }
}