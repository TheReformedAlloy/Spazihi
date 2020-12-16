/*************************************
*                                    *
*     Functions for Leaderboard:     *
*                                    *
*************************************/

//  Index:
const getLeaderboard = (data, settings, callback) => {  
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and period, which must be one of 'day,' 'week,' or 'month'
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/likes?period=${data.period}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  My Likes:
const getMyLikes = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/likes/mine?token=${settings.token}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  My Hits:
const getMyHits = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/likes/for_me?token=${settings.token}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};