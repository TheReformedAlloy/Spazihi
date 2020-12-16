/******************************
*                             *
*     Functions for Bots:     *
*                             *
******************************/

//  Create:
const createBot = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/bots?token=${settings.token}`,
        method: 'POST'
    }

    let body = {
        name: data.groupName,
        group_id: data.groupID,
        avatar_url: data.avatarURL || null,
        callback_url: data.callbackURL || null,
        dm_notification: data.dmNotification || null
    };
    
    makeRequest(options, body, callbck);
};
//  Post a Message:
const postBotMessage = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, botID, and text or attachments
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/bots/post?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        "bot_id": data.botID,
        "text": data.text,
        attachments: data.attachments || null
    };
    
    makeRequest(options, body, callback);
};
//  Index:
const getBots = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/bots?token=${settings.token}`,
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Destroy:
const removeBot = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain botID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/bots/destroy?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        "bot_id": data.botID
    };
    
    makeRequest(options, body, callback);
};