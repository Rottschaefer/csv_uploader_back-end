import { CSVBusiness } from "../../src/business/CSVBusiness"
import { CSVDatabaseMock, databaseMock, mockFile } from "../mocks/CSVDatabaseMock";



describe("Testing insertCSV", () => {

    const csvBusiness = new CSVBusiness(
       new CSVDatabaseMock()
    )

    test("Should insert the csv file info in the mock database", async () => {

        await csvBusiness.insertCSV(mockFile)

        expect(databaseMock).toHaveLength(5)
    })

    test("Should get the database info correctly", async () => {

        const input = ""

        const info = await csvBusiness.getInfo(input)

        expect(info).toHaveLength(5)
    })

})