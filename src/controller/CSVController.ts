import { CSVBusiness } from "../business/CSVBusiness";
import { Request, Response } from "express"
import { BadRequestError } from "../errors/BadRequestError";
import { BaseError } from "../errors/BaseError";
import { GetInfoSchema } from "../dto/getInfoDTO";


export class CSVController {
    constructor(
        private csvBusiness: CSVBusiness
    ) { }

    public insertCSV = async (req: Request, res: Response) => {
        try {
            const file: Express.Multer.File | undefined = req.file

            if (file === undefined) {
                throw new BadRequestError("No file was sent")
            }

            if (file.mimetype !== "text/csv") {
                throw new BadRequestError("Only CSV files are accepted")
            }

            this.csvBusiness.insertCSV(file)
            res.send("CSV file successfully submitted")
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getInfo = async (req: Request, res: Response) => {

        try {

            const input = GetInfoSchema.parse(req.query.q)

            const info = await this.csvBusiness.getInfo(input)

            res.status(200).send(info)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}