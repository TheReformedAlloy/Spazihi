const {gmRequest} = require('../gmRequest');


/*********************************
*                                *
*     Functions for Members:     *
*                                *
*********************************/

//  Add:
const addMembers = (groupID, data, callback) => {
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
        method: 'POST'
    };

    let body = {
        "members": data.members
    };
    
    return gmRequest(`groups/${groupID}/members/add?token=${process.env.apitoken}`, options, body, callback);
};
//  Results:
const getResultsFromAdd = (groupID, resultsID, query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and resultsID
    let options = {
        method: 'GET'
    };
    
    return gmRequest(`groups/${groupID}/members/results/${resultsID}?token=${process.env.apitoken}`, options, body, callback);
};
//  Remove:
const removeMember = (groupID, memberID, data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and memberID
    //membershipID is different from a userID, must retrieve the data from a getGroup
    let options = {
        method: 'POST'
    }

    let body = {
        "membership_id": data.memberID
    };
    
    return gmRequest(`groups/${groupID}/members/${memberID}/remove?${process.env.apitoken}`, options, body, callback);
};
//  Update:
const changeNickname = (groupID, data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and nickname
    //nickname must be within 1–50 chars
    let options = {
        method: 'POST'
    };

    let body = {
        "membership": {
            "nickname": data.nickname
        }
    };
    
    return gmRequest(`groups/${groupID}/memberships/update?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    addMembers,
    changeNickname,
    getResultsFromAdd,
    removeMember
}