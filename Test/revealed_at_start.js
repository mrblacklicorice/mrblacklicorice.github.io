var fs = require('fs');

var all = ["Melee", "Perk", "Power", "Ranged", "Shield", "Skin", "DeployedTrap", "Grenade"];
var dirname = `C:/Users/giris/Desktop/Games/Dead Cells/ModTools/Mod_pak/col/item/Grenade/`;

fs.readdirSync(dirname, function (err, filenames) {
    if (err) {
        console.log(err);
        return;
    }
    filenames.forEach(function (filename) {
        fs.readFileSync(dirname + filename, 'utf-8', function (err, content) {
            if (err) {
                console.log(err);
                return;
            }
            var cont = JSON.parse(content);
            cont.props.revealedAtStart = true;
            cont.cellCost = 1;
            fs.writeFileSync(dirname + filename, JSON.stringify(cont), function (err) {
                if (err) throw err;
            });
        });
    });
});