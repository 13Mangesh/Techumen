import { File } from '@ionic-native/file/ngx';

export class CsvDataService {

  constructor(public file: File) {}

    static exportToCsv(filename: string, rows: object[]) {
        if (!rows || !rows.length) {
          return;
        }
        const separator = ',';
        const keys = Object.keys(rows[0]);
        const csvContent = this.toCsv(this.pivot(rows));
        //   keys.join(separator) +
        //   '\n' +
        //   rows.map(row => {
        //     return keys.map(k => {
        //       let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        //       cell = cell instanceof Date
        //         ? cell.toLocaleString()
        //         : cell.toString().replace(/"/g, '""');
        //       if (cell.search(/("|,|\n)/g) >= 0) {
        //         cell = `"${cell}"`;
        //       }
        //       return cell;
        //     }).join(separator);
        //   }).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        return blob;
        // if (navigator.msSaveBlob) { // IE 10+
        //   navigator.msSaveBlob(blob, filename);
        // } else {
        //   const link = document.createElement('a');
        //   if (link.download !== undefined) {
        //     // Browsers that support HTML5 download attribute
        //     const url = URL.createObjectURL(blob);
        //     link.setAttribute('href', url);
        //     link.setAttribute('download', filename);
        //     link.style.visibility = 'hidden';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //   }
        // }
      }

      static pivot(arr) {
        var mp = new Map();
        
        function setValue(a, path, val) {
            if (Object(val) !== val) { // primitive value
                var pathStr = path.join('.');
                var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
                a[i] = val;
            } else {
                for (var key in val) {
                    setValue(a, key == '0' ? path : path.concat(key), val[key]);
                }
            }
            return a;
        }
        
        var result = arr.map( obj => setValue([], [], obj) );
        return [[...mp.keys()], ...result];
    }
    
    static toCsv(arr) {
        return arr.map( row => 
            row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(',')
        ).join('\n');
    }
}
