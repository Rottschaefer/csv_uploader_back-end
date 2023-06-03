import { CSVDatabase } from "../database/CSVDatabase";
import csvParser from 'csv-parser';
import fs from 'fs';
import { InsertCSVOutput } from "../dto/insertCSVDTO";
import { GetInfoDTOInput } from "../dto/getInfoDTO";
import { BadRequestError } from "../errors/BadRequestError";



export class CSVBusiness {
    constructor(
        private csvDatabase: CSVDatabase,
    ) { }

    public insertCSV = async (file: Express.Multer.File) => {


        const filePath = file.path;
        const results: InsertCSVOutput[] = [];


        if (file === undefined) {
            throw new BadRequestError("No file was sent")
        }

        if (!file.originalname.includes("csv")) {
            fs.unlink(filePath, (error) => {
                if (error) {
                    throw new Error(`An error occurred while uploading the file: ${error}`);
                }
            });
            throw new BadRequestError("Only CSV files are accepted")
        }

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser({ separator: ',' }))
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                    console.log(error)
                });
        });


        await this.csvDatabase.insertCSV(results)


        if(!file.originalname.includes("csvMock")){
        fs.unlink(filePath, (error) => {
            if (error) {
                throw new Error(`An error occurred while uploading the file: ${error}`);
            }
        });
    }

    }

    public getInfo = async (input: GetInfoDTOInput) => {
        const info = await this.csvDatabase.getInfo(input)

        return info
    }
}

