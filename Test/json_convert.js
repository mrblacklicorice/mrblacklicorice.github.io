var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(content);
            });
        });
    });
}

readFiles('./restaurant_data/', function (content) {
    var data = JSON.parse(content);
    var new_data = {};
    var final_data = [];
    var size_arr = [];
    var types = ["Latte", "Mocha", "Coffee"];
    var types_regex = [/latte/i, /mocha/i, /coffee/i];
    var new_size;
    var cur_types = [];
    var cur_sizes = [];
    var cur_name = "";
    var cur_obj = {};
    var done = [""];
    for (const item of Object.keys(data)) {
        if (item != "Name") {
            for (const menu_item of Object.keys(data[item])) {
                var new_size = menu_item.inbetween('{', '}');
                if (new_size != "" && !size_arr.includes(new_size)) size_arr.push(new_size);
                new_data[menu_item] = data[item][menu_item];
            }
        }
    }
    for (var item of Object.keys(new_data)) {
        cur_types = [];
        cur_sizes = [];
        cur_name = cur_name = item.substring(0, item.indexOf("{"));
        cur_obj = {};
        if (!done.includes(cur_name)) {
            done.push(cur_name);
            for (let i = 0; i < types.length; i++) {
                if (item.search(types_regex[i]) > 0) cur_types.push(types[i]);
            }
            if (cur_types.length == 0) cur_types.push("Etc");
            if (item.includes("{")) {
                for (const size of size_arr) {
                    if (new_data.hasOwnProperty(`${cur_name}{${size}}`)) cur_sizes.push(size);
                }
            } else {
                cur_sizes.push("Any Size");
            }
            cur_obj.Name = cur_name;
            for (const type of cur_types) {
                for (const size of cur_sizes) {
                    cur_obj[`${type}(${size})`] = (cur_sizes[0] == "Any Size") ? new_data[cur_name] : new_data[`${cur_name}{${size}}`];
                }
            }
            final_data.push(cur_obj);
        }
    }

    fs.writeFile(`./organized_data/${data.Name}.json`, JSON.stringify(final_data), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}, function (err) {
    throw err;
});


String.prototype.inbetween = function (target1, target2) {
    return this.substring(this.lastIndexOf(target1) + 1, this.lastIndexOf(target2));
}