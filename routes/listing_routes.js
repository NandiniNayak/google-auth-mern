const express = require("express");
const router = express.Router();
const ListingController = require("./../controllers/listing_controller");

router.get("/", ListingController.index);

router.post("/", ListingController.create);

router.get("/new", ListingController.make);

router.get("/", ListingController.show);

router.get("/", ListingController.edit);
router.post("/test", (req,res) => {
    console.log("-----TEST APP WORKING_-------")
    res.send("testing api working")
});

router.put("/", ListingController.update);

router.delete("/", ListingController.destroy);

module.exports = router;
