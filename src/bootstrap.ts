import 'dotenv/config'
import 'reflect-metadata'

import './webLayer/Controllers/equipment.controller'
import { Application } from './webLayer/Application'
import * as path from 'path'; 
const PROJECT_ROOT_DIR = path.resolve(__dirname, '..');

console.clear()

export async function bootstrap() {
  new Application().setup()
}

bootstrap()

export { PROJECT_ROOT_DIR }