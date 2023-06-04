import { CSVBusiness } from "../business/CSVBusiness";
import { Request, Response } from "express"
import { BadRequestError } from "../errors/BadRequestError";
import { BaseError } from "../errors/BaseError";
import { GetInfoDTOInput, GetInfoSchema } from "../dto/getInfoDTO";


export class CSVController {
    constructor(
        private csvBusiness: CSVBusiness
    ) { }

    public insertCSV = async (req: Request, res: Response) => {
        try {
            const file = req.file as Express.Multer.File

            await this.csvBusiness.insertCSV(file)

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

            let input: GetInfoDTOInput

            if (req.query.q) {
                input = GetInfoSchema.parse(req.query.q)
            }
            else {
                input = ""
            }

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