// Initialize css
require("./assets/css/main.css");

var tpl = require("./views/tpl.html");

document.getElementById("app-root").innerHTML = tpl();
