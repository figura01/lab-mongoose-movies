const express = require("express");
const {
    findByIdAndUpdate
} = require("../models/Celebrity");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

/* Show all celebrities */
router.get("/", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({});
        console.log(celebrities);

        res.render("celebrities/index", {
            celebrities: celebrities
        });

    } catch (errorDb) {
        next(errorDb);
    }
});

/* Register data to create New celebrity in DB*/
router.post("/", async (req, res, next) => {
    console.log('create new');
    try {
        console.log('post form for create');
        console.log(req.body);

        const newCelebrity = await Celebrity.create(req.body);
        console.log(newCelebrity);
        console.log(res);
        res.redirect("celebrities/");
    } catch (errDb) {
        next(errDb);
    }
});
/* Create New celebrity */

router.get("/new", (req, res, next) => {
    res.render("celebrities/new");
});

/* Show details of one celebrity */
router.get("/:id/show", async (req, res, next) => {
    try {
        console.log(req.params);
        const celebId = req.params.id;
        const celebrity = await Celebrity.findById(celebId);
        res.render("celebrities/show", {
            celebrity: celebrity
        });
    } catch (errDb) {
        next(errDb);
    }
});

/* Delete a celebrity */
router.post("/:id/delete", async (req, res, next) => {
    try {
        const celebrityId = req.params.id;
        console.log(celebrityId);
        await Celebrity.findByIdAndRemove(req.params.id);
        res.redirect("/celebrities");
    } catch (errDb) {
        next(errDb);
    }
});

/* get the celebrity id and share the view with actuel valuee in db for updating  */
router.get("/:id/edit", async (req, res, next) => {
    //console.log('get a id to update a celebrity');

    try {
        const celebrityId = req.params.id;
        const celebrity = await Celebrity.findById(celebrityId);

        res.render("celebrities/edit", {
            celebrity: celebrity
        });
    } catch (errDb) {
        next(errDb);
    }
});

/* Update the value of the current celebrity */
router.post("/:id/edit", async (req, res, next) => {
    //console.log('post tu update celebrity');
    try {
        const celebId = req.params.id;
        const updatedCelebrity = await Celebrity.findByIdAndUpdate(celebId, req.body, {
            useFindAndModify: true
        });
        res.redirect("/celebrities");
    } catch (errDb) {
        next(errDb);
    }
});

module.exports = router;