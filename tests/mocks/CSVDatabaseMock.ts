import { GetInfoDTOInput } from "../../src/dto/getInfoDTO";
import { InsertCSVOutput } from "../../src/dto/insertCSVDTO";
import { BaseDatabase } from "../../src/database/BaseDatabase";
import { CSVDB } from "../../src/models/csv";


export let databaseMock: CSVDB[] = [
    {
        name: "Eduardo",
        city: "Rio de Janeiro",
        country: 'Brazil',
        favorite_sport: "Soccer"
    },
    {
        name: "Regina",
        city: "São Paulo",
        country: 'Brazil',
        favorite_sport: "Badminton"
    },
    {
        name: "Claire",
        city: "Paris",
        country: 'France',
        favorite_sport: "Ballet"
    }

]

export const mockFile = {
    fieldname: 'csvFile',
    originalname: 'csvMock.csv',
    encoding: '7bit',
    mimetype: 'application/vnd.ms-excel',
    destination: 'mocks/',
    filename: 'd034d1b96501403785ba4b8e7f4da7bf',
    path: './tests/mocks/csvMock.csv',
    size: 295
} as Express.Multer.File





export class CSVDatabaseMock extends BaseDatabase {
    public static TABLE_CSV_FILES = "csv_info"

    public insertCSV = async (results: InsertCSVOutput[]) => {
        results.map((result)=>databaseMock.push(result))
    }

    public getInfo = async (input: GetInfoDTOInput) => {

        let info

        if (input) {

            info = await BaseDatabase.connection(CSVDatabaseMock.TABLE_CSV_FILES).whereLike("name", `%${input}%`).orWhereLike("city", `%${input}%`).orWhereLike("country", `%${input}%`).orWhereLike("favorite_sport", `%${input}%`)

            info = databaseMock.filter((card)=>card.name.toLowerCase().includes(input.toLowerCase()) ||
            card.city.toLowerCase().includes(input.toLowerCase()) ||
            card.country.toLowerCase().includes(input.toLowerCase()) ||
            card.favorite_sport.toLowerCase().includes(input.toLowerCase()) )
        }
        else {
            info = databaseMock
        }

        return info
    }
}