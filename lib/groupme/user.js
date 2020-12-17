const {gmRequest} = require('../gmRequest');


/*******************************
*                              *
*     Functions for Users:     *
*                              *
*******************************/

//  Me:
const getMyData = (query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`users/me?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  Update:
const changeUserData = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain botID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/update?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        avatar_url: data.avatarURL || null,
        name: data.name || null,
        email: data.email || null,
        zip_code: data.zipCode || null
    };
    
    return gmRequest(`users/update?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    changeUserData,
    getMyData
}