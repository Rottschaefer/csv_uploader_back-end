import { CSVDatabase } from "../database/CSVDatabase";
import csvParser from 'csv-parser';
import fs from 'fs';
import { InsertCSVOutput } from "../dto/insertCSVDTO";
import { GetInfoDTOInput } from "../dto/getInfoDTO";



export class CSVBusiness {
    constructor(
        private csvDatabase: CSVDatabase,
    ) { }

    public insertCSV = async (file: Express.Multer.File) => {
        const filePath = file.path;
        const results: InsertCSVOutput[] = [];



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
                });
        });

        await this.csvDatabase.insertCSV(results)

        fs.unlink(filePath, (error) => {
            if (error) {
                throw new Error(`An error occurred while uploading the file: ${error}`);
            }
        });
    }

    public getInfo = async (input: GetInfoDTOInput) => {
        const info = await this.csvDatabase.getInfo(input)

        return info
    }
}

