const logger = require('../../../logger');

const https = require('https');

let  randGUID = Math.floor(Math.random() * 65536);

//TODO add error handling for inappropriate status codes in responses.

const makeRequest = (options, body, callback) => {
    try{
        let request = https.request(options, function(res) {
            logger.info(`Making ${options.method} request to ${options.hostname}${options.path}`);
            
            let json = "";
            
            res.on('error', function(err) {
               logger.info("  Error sending request: " + JSON.stringify(err) + "\r\n");
            });
            res.on('timeout', function(err) {
               logger.info("  Timeout sending request: " + JSON.stringify(err) + "\r\n");
            });
            res.on('data', function(chunk){
                json += chunk;
            });
            res.on('end', function() {
                data = {};
                try {
                    data = JSON.parse(json);
                } catch(e) {
                    logger.error(e);
                    data = json;
                }
                if(callback) {
                    callback(data);
                } else {
                    logger.info("Nothing was done with the data");
                }
            });
        });
        
        request.end(JSON.stringify(body));
    } catch(err) {
        logger.error(err);
    }
};

/********************************
*                               *
*     Functions for Groups:     *
*                               *
********************************/

//  Index:
const listGroups = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups?token=${settings.token}`,
        method: 'GET'
    };
    
    makeRequest(options, null, callback);
};
//  Former:
const listFormerGroups = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/former?token=${settings.token}`,
        method: 'GET'
    };
    
    makeRequest(options, null, callback);
};
//  Show:
const getGroupData = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID or will throw an error.
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}?token=${settings.token}`,
        method: 'GET'
    };
    
    makeRequest(options, null, callback);
};
//  Create:
const createGroup = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups?token=${settings.token}`,
        method: 'POST'
    }

    let body = {
        name: data.groupName,
        description: data.description || null,
        image_url: data.imgURL || null,
        share: data.genShareLink || null
    };
    
    makeRequest(options, body, callback)
};
//  Update:
const updateGroup = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/update?token=${settings.token}`,
        method: 'POST'
    }
    
    let body = {
        name: data.groupmName || null,
        description: data.description || "",
        topic: data.topic || null,
        image_url: data.imgURL || null,
        share: data.genShareLink || null
    }
    
    makeRequest(options, body, callback);
};
//  Destroy:
const destroyGroup = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/destroy?token=${settings.token}`,
        method: 'POST'
    }
    
    let body = {};
    
    makeRequest(options, body, callback);
};
//  Join:
const joinGroup = (groupID, shareToken, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and shareToken
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/join/${shareToken}?token=${settings.token}`,
        method: 'POST'
    };
    
    let body = {};
    makeRequest(options, body, callback);
};
//  Rejoin
const rejoinGroup = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/join?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        "group_id": data.groupID
    };
    
    makeRequest(options, body, callback);
};
//  Change Owners
const changeOwners = (data, settings, callback) => {
    //POST message
    //Sends array of requests
    //TODO respond to the number of status codes sent back
    //settings object must contain hostname, path, and token
    //data object must contain an array of objects containing a userID and groupID, named changes
    try {
        let options = {
            hostname: settings.hostname,
            path: `${settings.path}/groups/change_owners?token=${settings.token}`,
            method: 'POST'
        };
        
        let body = {
            requests: []
        };
        
        if(data.userIDs.length == data.groupIDs.length) {
            for(i = 0; i < data.userIDs.length; i++) {
                body.requests.push({
                    group_id: data.groupIDs[i],
                    owner_id: data.userIDs[i] 
                });
            }
        } else {
            throw "Length of userIDs not equal to groupIDs, please review.";
        }
        
        makeRequest(options, body, callback);
    } catch(err) {
        logger.error(err);
    }
};

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

/**********************************
*                                 *
*     Functions for Messages:     *
*                                 *
**********************************/

//  Index:
const getMessages = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    //  data object can contain before_id, since_id, after_id, and limit
    //      limit must be within 20 to 100
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/messages?token=${settings.token}` + (data.beforeID ? `&before_id=${data.beforeID}` : '')
        + (data.sinceID ?  `&since_id=${data.sinceID}`   : '')
        + (data.afterID ?  `&after_id=${data.afterID}`   : '')
        + (data.limit ?  `&limit=${data.limit}`          : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Create:
const sendGroupMessage = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, source_guid, and text or attachments
    //  sourceGUID can be botID
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/messages?token=${settings.token}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {
        message: {
            source_guid: `${randGUID++}`,
            text: data.text,
            attachments: data.attachments || []
        }
    };
    
    makeRequest(options, body, callback);
};

/*******************************
*                              *
*     Functions for Chats:     *
*                              *
*******************************/
//Chats refer to direct message chats.

//  Index:
const getChats = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object can contain page and per_page
    //  limit must be within 20 to 100
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/chats?token=${settings.token}`
        + (data.page ? `&page=${data.page}` : '')
        + (data.perPage ? `&per_page=${data.perPage}` : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};

/*****************************************
*                                        *
*     Functions for Direct Messages:     *
*                                        *
*****************************************/

//  Index:
const getDirectMessages = (data, settings, callback) => {
    //GET message
    //TODO fix this and all functions with optional parameters. Perhaps change all parameters to be separate variables in the options object.
    //settings object must contain hostname, path, and token
    //data object can contain before_id or since_id
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/direct_messages?token=${settings.token}&other_user_id=${data.otherUserID}`
        + (data.beforeID ? `&before_id=${data.beforeID}` : '')
        + (data.sinceID ? `&since_id=${data.sinceID}`  : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Create:
const sendDirectMessage = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, source_guid, and text or attachments
    //  sourceGUID can be botID
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/direct_messages?token=${settings.token}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {
        "direct_message": {
            "source_guid": randGUID++,
            "text": data.text,
            "recipient_id": data.recipientID,
            "attachments": data.attachments || null
        }
    };
    
    makeRequest(options, body, callback);
};

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

/**********************************
*                                 *
*     Functions for SMS Mode:     *
*                                 *
**********************************/

//  Create:
const enableSMSMode = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/sms_mode?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        duration: data.duration,
        registration_id: data.registrationID || null
    };
    
    makeRequest(options, body, callback);
};
//  Delete:
const disableSMSMode = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/sms_mode/delete?token=${settings.token}`,
        method: 'POST'
    };

    let body = {};
    
    makeRequest(options, body, callback);
};

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

/*******************************
*                              *
*     Response Functions:      *
*                              *
*******************************/

exports.operations = {
    listGroups,
    listFormerGroups,
    getGroupData,
    createGroup,
    updateGroup,
    destroyGroup,
    joinGroup,
    rejoinGroup,
    changeOwners,
    addMembers,
    getResultsFromAdd,
    removeMember,
    changeNickname,
    getMessages,
    sendGroupMessage,
    getChats,
    getDirectMessages,
    sendDirectMessage,
    addLike,
    removeLike,
    getLeaderboard,
    getMyLikes,
    getMyHits,
    createBot,
    postBotMessage,
    getBots,
    removeBot,
    getMyData,
    changeUserData,
    enableSMSMode,
    disableSMSMode,
    getBlockedUsers,
    doesBlockExist,
    createBlock,
    deleteBlock,
    unblockUser
};