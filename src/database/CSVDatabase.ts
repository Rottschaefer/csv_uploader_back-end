import { GetInfoDTOInput } from "../dto/getInfoDTO";
import { InsertCSVOutput } from "../dto/insertCSVDTO";
import { BaseDatabase } from "./BaseDatabase";


export class CSVDatabase extends BaseDatabase {
    public static TABLE_CSV_FILES = "csv_info"

    public insertCSV = async (results: InsertCSVOutput[]) => {
        results.map(async (result: InsertCSVOutput) => {
            await BaseDatabase.connection(CSVDatabase.TABLE_CSV_FILES).insert(result)
        })
    }

    public getInfo =async (input: GetInfoDTOInput) => {

        console.log(input)
        const info = await BaseDatabase.connection(CSVDatabase.TABLE_CSV_FILES).whereLike("name", `%${input}%`).orWhereLike("city", `%${input}%`).orWhereLike("country", `%${input}%`).orWhereLike("favorite_sport", `%${input}%`)

        console.log(info)
        
        return info
    }
}