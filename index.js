const fs   = require('fs');
const path = require('path');

module.exports = async function readdirDeep(dir = '.') {
    let content = (await fs.promises.readdir(dir)).map(f => path.join(dir, f));
    return content.filter(f => !fs.lstatSync(f).isDirectory())
        .concat(...await Promise.all(content.filter(f => fs.lstatSync(f).isDirectory())
            .map(d => readdirDeep(d))));
};