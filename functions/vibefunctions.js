const fs = require('fs');
const path = require('path');
const https = require('https');

const assignChastity = (user, keyholder) => {
    if (process.chastity == undefined) { process.chastity = {} }
    process.chastity[user] = {
        keyholder: keyholder ? keyholder : "unlocked"
    }
    fs.writeFileSync(`./chastityusers.txt`, JSON.stringify(process.chastity));
}

const getChastity = (user) => {
    if (process.chastity == undefined) { process.chastity = {} }
    return process.chastity[user];
}

const removeChastity = (user) => {
    if (process.chastity == undefined) { process.chastity = {} }
    delete process.chastity[user];
    fs.writeFileSync(`./chastityusers.txt`, JSON.stringify(process.chastity));
}

exports.assignChastity = assignChastity
exports.getChastity = getChastity
exports.removeChastity = removeChastity