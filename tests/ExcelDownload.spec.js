const Exceljs = require('exceljs');
import {test,expect} from "@playwright/test";

async function writeExcel(filePath,searchText,replaceText,change){

    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row,output.column+change.colChange)
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet,searchText){
    const output = {row:-1,column:-1}
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            if(cell.value === searchText){
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

test('Upload Download Excel Validation',async({page}) =>{
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:"Download"}).click();
    const download = await downloadPromise;
    await download.saveAs("D://Downloads//download.xlsx");
    writeExcel('D://Downloads//download.xlsx',textSearch,updateValue,{ rowChange: 0, colChange: 2 });
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("D://Downloads//download.xlsx");
    await page.screenshot({path:'excel.png'});

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});

