/*******************************
*                              *
*     Functions for Users:     *
*                              *
*******************************/

//  Me:
const getMyData = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/me?token=${settings.token}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Update:
const changeUserData = (data, settings, callback) => {
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
    
    makeRequest(options, body, callback);
};