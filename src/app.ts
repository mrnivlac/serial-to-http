import express from 'express';

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const sport = new SerialPort('COM14')

let line: string;
const parser = sport.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', data => {
    console.log(data);
    let d = String(data);
    if(d.includes('got')) {
        line = d;
    }
})


const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', ['*']);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Content-Type', 'text/plain');
    line = '{"val": "' + line + '"}';
    res.send(line); //"S got 522750: 25.82, 66.15, 493, r279, 1, r32, 20, 0"
    //res.send('{"val": "S got 522750: 25.82, 66.15, 493, r279, 1, r32, 20, 0"}');
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});