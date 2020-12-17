const {gmRequest} = require('../gmRequest');

/********************************
*                               *
*     Functions for Groups:     *
*                               *
********************************/

//  Index:
const listGroups = (query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        method: 'GET'
    };
    
    return gmRequest(`groups?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  Former:
const listFormerGroups = (query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    let options = {
        method: 'GET'
    };
    
    return gmRequest(`groups/former?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  Show:
const getGroupData = (groupID, query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID or will throw an error.
    let options = {
        method: 'GET'
    };
    
    return gmRequest(`groups/${groupID}?${new URLSearchParams({token: process.env.apitoken, ...query})}`, options, null, callback);
};
//  Create:
const createGroup = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupName or will throw an error.
    
    let options = {
        method: 'POST'
    }

    let body = {
        name: data.groupName,
        description: data.description || null,
        image_url: data.imgURL || null,
        share: data.genShareLink || null
    };
    
    return gmRequest(`groups?token=${process.env.apitoken}`, options, body, callback);
};
//  Update:
const updateGroup = (groupID, data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    let options = {
        method: 'POST'
    }
    
    let body = {
        name: data.groupmName || null,
        description: data.description || "",
        topic: data.topic || null,
        image_url: data.imgURL || null,
        share: data.genShareLink || null
    }
    
    return gmRequest(`groups/${groupID}/update?token=${process.env.apitoken}`, options, body, callback);
};
//  Destroy:
const destroyGroup = (groupID, data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        method: 'POST'
    }
    
    let body = {};
    
    return gmRequest(`groups/${groupID}/destroy?token=${process.env.apitoken}`, options, body, callback);
};
//  Join:
const joinGroup = (groupID, shareToken, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID and shareToken
    let options = {
        method: 'POST'
    };
    
    let body = {};
    return gmRequest(`groups/${groupID}/join/${shareToken}?token=${process.env.apitoken}`, options, body, callback);
};
//  Rejoin
const rejoinGroup = (data, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    let options = {
        method: 'POST'
    };

    let body = {
        "group_id": data.groupID
    };
    
    return gmRequest(`groups/join?token=${process.env.apitoken}`, options, body, callback);
};
//  Change Owners
const changeOwners = (data, callback) => {
    //POST message
    //Sends array of requests
    //TODO respond to the number of status codes sent back
    //settings object must contain hostname, path, and token
    //data object must contain an array of objects containing a userID and groupID, named changes
    try {
        let options = {
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
        
        return gmRequest(`groups/change_owners?token=${process.env.apitoken}`, options, body, callback);
    } catch(err) {
        logger.error(err);
    }
};

module.exports = {
    changeOwners,
    createGroup,
    destroyGroup,
    getGroupData,
    joinGroup,
    listFormerGroups,
    listGroups,
    rejoinGroup,
    updateGroup
}