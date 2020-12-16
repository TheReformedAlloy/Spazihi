/*******************************
*                              *
*     Functions for Likes:     *
*                              *
*******************************/

//  Create:
const addLike = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/messages/${data.conversationID}/${data.messageID}/like?token=${settings.token}`,
        method: 'POST'
    };

    let body = {};
    
    makeRequest(options, body, callback);
};
//  Destroy:
const removeLike = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/messages/${data.conversationID}/${data.messageID}/unlike?token=${settings.token}`,
        method: 'POST'
    };

    let body = {};
    
    makeRequest(options, body, callback);
};