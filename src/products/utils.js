
const excelGenerator = (productos, res, name) => {
    const xl = require('excel4node');
    const debug = require('debug')('app:utils-product');

    productos = productos.map((producto) => {
        let id = producto._id.toString();
        delete producto._id;
        return {
            id,
            ...producto
        }
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Inventario');

    for (let i = 1; i <= productos.length; i++) {
        //debug('Creando celda');
        for (let j = 1; j <= Object.values(productos[0]).length; j++) {
            //debug('Guardando dato');
            let data = Object.values(productos[i-1])[j-1];
            if (typeof data === 'string') {
                ws.cell(i,j).string(data);
            }else{
                ws.cell(i,j).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res);

}


module.exports.ProductsUtils = {
    excelGenerator
}