/********************************
*                               *
*     Functions for Blocks:     *
*                               *
********************************/

//  Index:
const getBlockedUsers = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain userID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/blocks?user=${data.userID}&token=${settings.token}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Block Between:
const doesBlockExist = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${settings.token}`,
        method: 'GET'
    };
    
    makeRequest(options, null, callback);
};
//  Create:
const createBlock = () => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${settings.token}`,
        method: 'POST'
    };

    let body = {};
    
    makeRequest(options, body, callback);
};
//  Unblock (1):
const deleteBlock = (data, settings, callback) => {
    //DELETE message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${settings.token}`,
        method: 'DELETE'
    }
    
    makeRequest(options, null, callback);
};
//  Unblock (2):
const unblockUser = (data, settings, callback) => {
    //DELETE message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/blocks/delete?user=${data.userID}&otherUser=${data.otherUserID}&token=${settings.token}`,
        method: 'POST'
    };
    
    makeRequest(options, null, callback);
};