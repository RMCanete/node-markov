/** Command-line tool to generate Markov text. */

const fs = require(`fs`);
const markov = require (`./markov`);
const axios = require(`axios`);
const process = require(`process`);

function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function text(path) {
    fs.readFile(path, `utf8`, function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            makeText(data);
        }
    });
};

async function makeURLText(url) {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
    makeText(response.data)
}

let [method, path] = process.argv.slice(2);
if (method === `file`) {
    text(path);}
else if (method === `url`) {
    makeURLText(path)
}
else {
    console.error(`UNKNOWN METHOD: ${method}`);
    process.exit(1);
}