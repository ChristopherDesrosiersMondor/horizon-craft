import { Container } from 'inversify'
import { DBService } from './dataAccessLayer/db.service'
import { EquipmentsRepository } from './dataAccessLayer/equipments.repository'
import { EquipmentsService } from './serviceLayer/equipments.service'

export const container = new Container({
    defaultScope: "Singleton",
})

container.bind(DBService).toSelf()

// Equipments dependencies
container.bind(EquipmentsRepository).toSelf()
container.bind(EquipmentsService).toSelf()