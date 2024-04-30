import 'dotenv/config'
import 'reflect-metadata'

import './webLayer/Controllers/equipment.controller'
import { Application } from './webLayer/Application'

console.clear()

export async function bootstrap() {
  new Application().setup()
}

bootstrap()