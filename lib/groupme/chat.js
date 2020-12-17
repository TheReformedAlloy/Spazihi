const {gmRequest} = require('../gmRequest');

/*******************************
*                              *
*     Functions for Chats:     *
*                              *
*******************************/
//Chats refer to direct message chats.

//  Index:
const getChats = (query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object can contain page and per_page
    //  limit must be within 20 to 100
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`chats?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};

module.exports = {
    getChats
};