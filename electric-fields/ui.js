document.getElementById('ctrls-add-btn').addEventListener('click', () => {
    // get inputted charge and validate
    let val = document.getElementById('charge-add').value;

    if (val == null || val == '') {
        return;
    } else {
        try {
            val = parseFloat(val)
        } catch {
            return;
        }
    }

    // create a charge at the centre of the canvas with inputted charge
    let charge = new Charge(val, createVector(viewWidth / 2, viewHeight /2))
    charges.push(charge)
})

// clear canvas
document.getElementById('ctrls-clear-btn').addEventListener('click', () => {
    charges = []
    document.getElementById('table-data').innerHTML = '';
    measurements = [];
})

// enable / disable measure tool
document.getElementById('ctrls-measure-btn').addEventListener('click', () => {
    if (isMeasure) {
        isMeasure = false;
        document.getElementById('ctrls-measure-btn').innerHTML = 'Measure';
    } else {
        isMeasure = true;
        document.getElementById('ctrls-measure-btn').innerHTML = 'Position'
    }
})

// download measurements
document.getElementById('download-data').addEventListener('click', () => {
    let data = measurements;
    let headers = 'E (N/C), r (m), V (V)\n';
    let strData = data.map(row => row.join(",")).join("\n");
    let csvData = headers.concat(strData);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
  
    let a = document.createElement('a')
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})