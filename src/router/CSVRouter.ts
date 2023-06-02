import express from "express"
import { CSVController } from "../controller/CSVController"
import { CSVBusiness } from "../business/CSVBusiness"
import { CSVDatabase } from "../database/CSVDatabase"


const multer = require("multer")
const upload = multer({dest: "uploads/"})

export const csvRouter = express.Router()

const csvController = new CSVController(
    new CSVBusiness(
        new CSVDatabase
    )
)

csvRouter.post("/api/files", upload.single("csvFile"), csvController.insertCSV)
csvRouter.get("/api/users", csvController.getInfo)

