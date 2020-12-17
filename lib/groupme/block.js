const {gmRequest} = require('../gmRequest');

/********************************
*                               *
*     Functions for Blocks:     *
*                               *
********************************/

//  Index:
const getBlockedUsers = (data, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain userID
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`blocks?user=${data.userID}&token=${process.env.apitoken}`,
        options, null, callback);
};
//  Block Between:
const doesBlockExist = (data, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        method: 'GET'
    };
    
    return gmRequest(`blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${process.env.apitoken}`,
        options, null, callback);
};
//  Create:
const createBlock = () => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    let options = {
        method: 'POST'
    };

    let body = {};
    
    return gmRequest(`blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${process.env.apitoken}`,
        options, body, callback);
};
//  Unblock (1):
const deleteBlock = (data, callback) => {
    //DELETE message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        method: 'DELETE'
    }
    
    return gmRequest(`blocks?user=${data.userID}&otherUser=${data.otherUserID}&token=${process.env.apitoken}`,
        options, null, callback);
};
//  Unblock (2):
const unblockUser = (data, callback) => {
    //DELETE message
    //settings object must contain hostname, path, and token
    //data object must contain userID and otherUserID
    let options = {
        method: 'POST'
    };
    
    return gmRequest(`blocks/delete?user=${data.userID}&otherUser=${data.otherUserID}&token=${process.env.apitoken}`,
        options, null, callback);
};

module.exports = {
    createBlock,
    deleteBlock,
    doesBlockExist,
    getBlockedUsers,
    unblockUser
};