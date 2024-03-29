import {NEW_LISTING, SET_LISTINGS, DELETE_LISTING} from '../actions/types'; 

const initialState = {
    listings: []
};

const listingReducer = (state = initialState, action) => {
     // copied state //
    let newState = {...state};
    let newListings = [...newState.listings]
    // new listing action //
        if (action.type === NEW_LISTING) {
            newListings.push(action.val)};
    // set listings action //
        if (action.type === SET_LISTINGS) {
            newListings = action.val};
    // delete listing action //
        if (action.type === DELETE_LISTING) {
            const index = newListings.findIndex(listing => listing._id === action.val);
            const listings = [...newListings]
            listings.splice(index, 1);
            newListings = listings;
        }
        // setting new state after an action has occured //
        newState.listings = newListings;
        return newState;
}
export default listingReducer;