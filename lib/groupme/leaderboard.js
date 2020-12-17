const {gmRequest} = require('../gmRequest');


/*************************************
*                                    *
*     Functions for Leaderboard:     *
*                                    *
*************************************/

//  Index:
const getLeaderboard = (groupID, query, callback) => {  
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and period, which must be one of 'day,' 'week,' or 'month'
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`groups/${groupID}/likes?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  My Likes:
const getMyLikes = (groupID, query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`groups/${groupID}/likes/mine?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  My Hits:
const getMyHits = (groupID, query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`groups/${groupID}/likes/for_me?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};

module.exports = {
    getLeaderboard,
    getMyHits,
    getMyLikes
}