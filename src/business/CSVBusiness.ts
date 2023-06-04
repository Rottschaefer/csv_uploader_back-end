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

        if (file === undefined) {
            throw new BadRequestError("No file was sent")
        }


        const filePath = file.path;
        const results: InsertCSVOutput[] = [];



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
                });
        });

        if (results.length === 0) {
            fs.unlink(filePath, (error) => {
                if (error) {
                    throw new Error(`An error occurred while uploading the file: ${error}`);
                }
            });
            throw new BadRequestError("The uploaded file is empty")
        }


        for (let i = 0; i < results.length; i++) {

            if(Object.keys(results[i]).length !== 4){
                fs.unlink(filePath, (error) => {
                    if (error) {
                        throw new Error(`An error occurred while uploading the file: ${error}`);
                    }
                });
                throw new BadRequestError("The uploaded file does not follow the model")
            }

            if (
                !results[i].name ||
                !results[i].city ||
                !results[i].country ||
                !results[i].favorite_sport
            ) {
                fs.unlink(filePath, (error) => {
                    if (error) {
                        throw new Error(`An error occurred while uploading the file: ${error}`);
                    }
                });
                throw new BadRequestError("The uploaded file does not follow the model")
            }
        }





        await this.csvDatabase.insertCSV(results)


        if (!file.originalname.includes("csvMock")) {
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

