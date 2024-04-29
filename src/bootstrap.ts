import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'

import './webLayer/equipment.controller'

console.clear()

export async function bootstrap() {
  const container = new Container()
  const server = new InversifyExpressServer(container)

  server.setConfig((app) => {
    app.use(express.json())
  })

  const app = server.build()

  app.listen(process.env.PORT, () => {
    console.log(`server is running on http:localhost:${process.env.PORT}`)
  })
  return {}
}

bootstrap()