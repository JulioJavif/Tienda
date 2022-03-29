
const excelGenerator = (res, ventas, name) => {
    const xl = require('excel4node');
    const debug = require('debug')('app:utils-sales');

    ventas = ventas.map((venta) => {
        let id = venta._id.toString();
        delete venta._id;
        return {
            id,
            ...venta
        }
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('DB-Ventas');

    for (let i = 1; i < array.length; i++) {
        
        for (let j = 1; j < array.length; j++) {
            
            let data = Object.values(ventas[i-1])[j-1];
            if (typeof data === 'string') {
                ws.cell(i,j).string(data);
            } else {
                ws.cell(i,j).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res);

};

module.exports.SalesUtils = {
    excelGenerator
}