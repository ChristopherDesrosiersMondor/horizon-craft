import express from "express"

import { InversifyExpressServer } from "inversify-express-utils"

import { DBService } from "../dataAccessLayer/db.service"
import { AbstractApplication } from "./lib/abstract-application"
import { container } from "@/DiContainer"

export class Application extends AbstractApplication {
    async setup() {
        const _db = container.get(DBService)

        await _db.connect()

        const server = new InversifyExpressServer(container)

        server.setConfig((app) => {
          app.use(express.json());
          app.use(express.urlencoded({ extended: true }));
        })
      
        const app = server.build()
      
        app.listen(process.env.PORT, () => {
          console.log(`server is running on http:localhost:${process.env.PORT}`)
        })
    }
}