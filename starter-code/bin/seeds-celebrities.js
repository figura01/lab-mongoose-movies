require("dotenv").config();
const Celebrity = require("../models/Celebrity");
const mongoose = require("mongoose");

const celebrities = [
    {
        name: "Chuck Norris",
        occupation: "Actor",
        catchPhrase: "When Chuck Norris does a push up, he isn't lifting himself up, he's pushing the Earth down."
    },
    {
        name: "Bono",
        occupation: "Singer",
        catchPhrase: "Christians are hard to tolerate; I don't know how Jesus does it"
    },
    {
        name: "Robin Williams",
        occupation: "Comedian",
        catchPhrase: "If women ran the world we wouldn’t have wars, just intense negotiations every 28 days."
    },
];

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((self) => {
        Celebrity.create(celebrities)
        .then((dbResult) => {
            console.log(dbResult);
        })
        .catch((errorDb) => {
            console.log(errorDb);
        });
    })
    .catch((errorDb) => {
        console.log(errorDb);   
    });
