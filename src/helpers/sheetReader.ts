import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { UNDEFINED, convertNameToDbSafe } from './nameConverter';


export async function readODSAndConvertToJson(odsFilePath: string, outputJsonFilePath: string) {
    try {
        const realPath = fs.realpathSync(odsFilePath, {encoding:'utf-8'})
        const realWritePath = fs.realpathSync(outputJsonFilePath, {encoding:'utf-8'})
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(realPath);

        const jsonData: any = {};

        workbook.eachSheet((worksheet, sheetId) => {
            if (worksheet) {
                const sheetData: any[] = [];

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber !== 1) { // Exclude header row
                        const equipment: any = {};

                        row.eachCell((cell, colNumber) => {
                            const columnName = worksheet.getRow(1).getCell(colNumber).text;
                            const cleanColumnName = convertNameToDbSafe(columnName)
                            
                            if (cleanColumnName != UNDEFINED) {
                                const cellValue = cell.text;
                                equipment[cleanColumnName] = cellValue;
                            }
                        });

                        sheetData.push(equipment);
                    }
                });

                jsonData[`${worksheet.name}`] = sheetData;
            }
        });

        // Write JSON to file
        fs.writeFileSync(`${realWritePath}/equipments.json`, JSON.stringify(jsonData, null, 2));

        console.log('Conversion complete. JSON file generated successfully.');
        return 200
    } catch (error) {
        console.error('Error occurred while reading and converting ODS file:', error);
        return 500
    }
}
