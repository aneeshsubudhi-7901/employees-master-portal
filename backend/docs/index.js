const basicInfo = require("./basicInfo");
const components = require("./components");
const servers = require("./servers");
const tags = require("./tags");
const employees = require("./employees")
const security = require("./security");

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...security,
    ...tags,
    paths: {...employees.paths}
};