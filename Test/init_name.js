var fs = require('fs');

var all = ["Melee", "Perk", "Power", "Ranged", "Shield", "Skin", "DeployedTrap", "Grenade"];
var newdir = `C:/Users/giris/Desktop/Games/Dead Cells Old/Mod Tools/Mod_pak/test/data/item/`;
var olddir = `C:/Users/giris/Desktop/Games/Dead Cells Old/Mod Tools/Mod_pak/test2/data/item/`;
var dirname = `C:/Users/giris/Desktop/Games/Dead Cells Old/Mod Tools/Mod_pak/test/data/item/`;

console.log("running");

copy_index(olddir, newdir);
// deep_trim(dirname);

// var filenames = fs.readdirSync(dirname);
var content;

// console.log(filenames);

// filenames.forEach(function (filename) {
//     // fs.rename(dirname + filename, dirname + filename.substring(6), function (err) {
//     //     if (err) throw err;
//     //     console.log('File Renamed.');
//     // });

//     console.log(filename);
//     // content = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'))
//     // fs.writeFileSync(dirname + filename, JSON.stringify(content))
// });

// var content = fs.readFileSync(dirname + "AmmoBackOnUse.json", 'utf-8');

// var cont = JSON.parse(content);
// console.log(content);
// console.log(cont.index);

function deep_trim(dir) {
    var filenames = fs.readdirSync(dir);
    filenames.forEach(function (filename) {
        if (filename.indexOf(".") == -1) {
            deep_trim(dir + filename + "/");
        } else {
            if (filename != "__PROPS__.json" && filename != "__STRUCTURE__.json") {
                fs.rename(dir + filename, dir + filename.substring(4), function (err) { if (err) throw err; });
            }
        }
    });
}

function copy_index(odir, ndir) {
    var filenames = fs.readdirSync(odir);
    var old_content;
    var old_cont;
    var new_content;
    var new_cont;
    filenames.forEach(function (filename) {
        if (filename.indexOf(".") == -1) {
            copy_index(odir + filename + "/", ndir + filename + "/");
        } else {
            old_content = fs.readFileSync(odir + filename, 'utf-8');
            new_content = fs.readFileSync(ndir + filename, 'utf-8');

            old_cont = JSON.parse(old_content);
            new_cont = JSON.parse(new_content);

            if (old_cont.index != new_cont.index || old_cont.__original_Index != new_cont.__original_Index) {
                old_cont.index = new_cont.index;
                old_cont.__original_Index = new_cont.__original_Index;

                fs.writeFileSync(odir + filename, JSON.stringify(old_cont));
                fs.writeFileSync(ndir + filename, JSON.stringify(new_cont));
            }
        }
    });
}
