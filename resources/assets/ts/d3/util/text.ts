function _getTextLines(text: string, width: any, bold: any, font: string, size: any, className: string) {
    let rows: any = [],
        height:number = 0,
        words, lastRow:any, div:any;

    if (!width || !text || !text.length)
        return rows;

    div = document.createElement('div');
    div.innerHTML = '';

    if (className)
        div.setAttribute('class', className);
    if (font)
        div.style.fontFamily = font;
    if (bold)
        div.style.fontWeight = bold;
    if (size)
        div.style.fontSize = size + 'px';

    div.style.width = width + 'px';

    document.body.appendChild(div);

    words = text.split(' ');
    lastRow = 0;
    words.forEach(function (word, i) {
        var inserted = (!div.innerHTML.length) ? [] : div.innerHTML.split('');
        inserted.push(word);
        div.innerHTML = inserted.join(' ');
        if (div.clientHeight != height) {
            rows.push([]);
            lastRow = rows.length - 1;
            height = div.clientHeight;
        }
        rows[lastRow].push(word);
    });

    document.body.removeChild(div);
    return rows.map(function (row: any) {
        return row.join(' ');
    });
}

export function getTextRows(text: string, width: any, bold: any, font: any, size: any, className: string) {
    let rows: any = [],
        height = 0,
        lines, lastRow, div;

    if (!width || !text || !text.length)
        return rows;

    lines = text.split(/\r\n|\r|\n/);
    lines.forEach(function (line) {
        var r = _getTextLines(line, width, bold, font, size, className);
        rows = rows.concat(r);
    })
    return rows;
}