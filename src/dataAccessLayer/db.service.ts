import { equimentModel } from '@/dataAccessLayer/models/equipment.model'
import { injectable } from 'inversify'
import mongoose from 'mongoose'

@injectable()
export class DBService {
    private _db: typeof mongoose

    async connect() {
        this._db = await mongoose
        .connect(process.env.DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      
        console.log('connected to DB')
    }

    get equipments() {
        return this._db.model('Equipment', equimentModel)
    }
}