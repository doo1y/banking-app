const cors = require("cors"),
    fetch = require("node-fetch"),
    express = require("express"),
    morgan = require("morgan"),
    {map} = require("p-iteration");

const db = require("./db/models");
const {enviroment, bank_client_database_url} = require("./config");
