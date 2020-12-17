const {gmRequest} = require('../gmRequest');


/******************************
*                             *
*     Functions for Bots:     *
*                             *
******************************/

//  Create:
const createBot = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    let options = {
        method: 'POST'
    }

    let body = {
        name: data.botName,
        group_id: data.groupID,
        avatar_url: data.avatarURL || null,
        callback_url: data.callbackURL || null,
        dm_notification: data.dmNotification || null
    };
    
    return gmRequest(`bots?token=${process.env.apitoken}`, options, body, callbck);
};
//  Post a Message:
const postBotMessage = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, botID, and text or attachments
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    let options = {
        method: 'POST'
    };

    let body = {
        "bot_id": data.botID,
        "text": data.text,
        attachments: data.attachments || null
    };
    
    return gmRequest(`bots/post?token=${process.env.apitoken}`, options, body, callback);
};
//  Index:
const getBots = (query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`bots?token=${process.env.apitoken}`, options, null, callback);
};
//  Destroy:
const removeBot = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain botID
    let options = {
        method: 'POST'
    };

    let body = {
        "bot_id": data.botID
    };
    
    return gmRequest(`bots/destroy?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    createBot,
    getBots,
    postBotMessage,
    removeBot
}