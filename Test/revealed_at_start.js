var fs = require('fs');

var all = ["Melee", "Perk", "Power", "Ranged", "Shield", "Skin", "DeployedTrap", "Grenade"];
var dirname = `C:/Users/giris/Desktop/Games/Dead Cells/Mod Tools/Mod_pak/res/data/item/`;

var filenames;
var content;

all.forEach(function (type) {
    filenames = fs.readdirSync(dirname + type + "/")

    filenames.forEach(function (filename) {
        // fs.rename(dirname + filename, dirname + filename.substring(6), function (err) {
        //     if (err) throw err;
        //     console.log('File Renamed.');
        // });

        content = JSON.parse(fs.readFileSync(dirname + type + "/" + filename, 'utf-8'))
        content.props.revealedAtStart = true;
        content.cellCost = 1;
        fs.writeFileSync(dirname + type + "/" + filename, JSON.stringify(content))
    });
});
