const Exceljs = require('exceljs');
//import Exceljs from 'exceljs';

async function writeExcel(filePath,searchText,replaceText){

    
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row,output.column)
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText){
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
writeExcel('D://PlaywrightAutomation//ExcelDownloadTest.xlsx','Mango','Iphone');

