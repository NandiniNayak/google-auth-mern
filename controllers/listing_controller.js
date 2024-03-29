const mongoose = require("mongoose");
const ListingModel = require("../database/models/listing_model");
require("../database/models/listing_model")
const Listing = mongoose.model("listings")


//showing a list of all listings
async function index(req, res) {
    Listing.find()
        .then(listings => {console.log(listings);
            res.json(listings)})
        .catch(err => console.log(err))
}

//shows form to make new listing
function make(req, res) {
    res.render("CreateListingView");
}

//create and save to db a new listing
async function create(req, res) {
    let newListing = {title: req.body.title,
        description: req.body.description};
    // saving the listing to the database and logging
    new Listing(newListing)
        .save()
        .then(listing => {
            res.json(listing)
            console.log("logging creation of" + listing)
        })
        .catch(err => console.log("Logging the error on save listing is" +err))
};

const show = async (req, res) => {
    let { _id } = req.params
    let listing = await ListingModel.findById(id)
        .then(listings => {console.log(listings);
            res.json(listings)})
        .catch(err => res.status(500).send(err))
}

const edit = async (req, res) => {
    Listing.find()
    .then(listings => {console.log(listings);
        res.json(listings)})
    .catch(err => console.log(err))
}


const update = async (req, res) => {
     // finding listing by id attached
     Listing.findById({_id: req.body._id})
     // checking if each = the other than saving changes to database
       .then(listing => {
         (listing.title = req.body.title), (listing.description = req.body.description);
         listing.save().then(listing => {
           res.json(listing);
         });
       })
       .catch(err => console.log("Editing error is"+err));
}

const destroy = async (req, res) => {
    Listing.remove({_id: req.body._id})
    .then(() => {res.send("You've deleted the listing from db");})
    .catch(err => console.log("Error with deleting from db is" +err));
}

  module.exports = {
    index,
    create,
    make,
    show,
    edit,
    update,
    destroy
}