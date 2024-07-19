const fs = require('fs');

function getFilePath(file) {

    const path = file.path.split('\\');
    const folder = `${path[2]}/${path[3]}`;
    console.log(folder);

    return folder;


}

function removeFile(path) {


    try {
        if (!path) {
            throw new Error('error por que no hay imagen');
        }
        fs.unlinkSync(`src/uploads/${path}`);
    } catch (error) {

    }
}

module.exports = {
    getFilePath,
    removeFile,
};