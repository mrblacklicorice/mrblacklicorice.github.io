const fs = require('fs');
const request = require('request');
var links = require("./info.json");
var done = require("./done.json");

var count = 0;
var keys = Object.keys(links);
var length = Object.keys(links).length;

const download = (url, path, name, index) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('finish', () => {
                done.push(name);
                count++
                console.log(`(${count}/${length})` + name + "✔️");
                if (count == length) fs.writeFile('./Tom_&_Jerry/done.json', JSON.stringify(done));
                if (index + 1 != length) download(links[keys[index + 1]], `E:/Tom & Jerry/${keys[index + 1]}.mp4`, keys[index + 1], index + 1);

            })
            .on('error', (err) => {
                fs.unlink(path);
                count++
                console.log(name + "❌");
                if (count == length) fs.writeFile('./Tom_&_Jerry/done.json', JSON.stringify(done));
                if (index + 1 != length) download(links[keys[index + 1]], `E:/Tom & Jerry/${keys[index + 1]}.mp4`, keys[index + 1], index + 1);
            });
    })
}

// :) uwu :( 
// for (const name in links) {
//     if (links.hasOwnProperty(name) && !(fs.readdirSync("E:/Tom & Jerry/")).includes(name + ".mp4") && !done.includes(name)) {
download(links[keys[0]], `E:/Tom & Jerry/${keys[0]}.mp4`, keys[0], 0);
//     }
// }

