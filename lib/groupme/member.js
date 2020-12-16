/*********************************
*                                *
*     Functions for Members:     *
*                                *
*********************************/

//  Add:
const addMembers = (data, settings, callback) => {
    //POST message
    //TODO add error-checking for wrongly formatted member objects
    /*User data consists of an array of objects:
        nickname    (required)
        user_id     (required)
        phone_number
        email
        guid
    */
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/members/add?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        "members": data.members
    };
    
    makeRequest(options, body, callback);
};
//  Results:
const getResultsFromAdd = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and resultsID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/members/results/${data.resultsID}?token=${settings.token}`,
        method: 'GET'
    };
    
    makeRequest(options, body, callback);
};
//  Remove:
const removeMember = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and memberID
    //membershipID is different from a userID, must retrieve the data from a getGroup
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/members/${data.memberID}/remove?token=${settings.token}`,
        method: 'POST'
    }

    let body = {
        "membership_id": data.memberID
    };
    
    makeRequest(options, body, callback);
};
//  Update:
const changeNickname = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and nickname
    //nickname must be within 1–50 chars
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/memberships/update?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        "membership": {
            "nickname": data.nickname
        }
    };
    
    makeRequest(options, body, callback);
};