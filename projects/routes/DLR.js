var fs = require('fs');
function dynamicallyLoadRoutes(app) {
    let filenames = fs.readdirSync(__dirname);
    filenames.forEach((filename) => {
        if (
            filename === "DLR.js" ||
            filename.substr(filename.lastIndexOf(".") + 1) !== "js"
        ) {
            return;
        }

        let jsModule = filename.substr(0, filename.indexOf("."));
        require("./" + jsModule)(app);
    });
}

module.exports = dynamicallyLoadRoutes;