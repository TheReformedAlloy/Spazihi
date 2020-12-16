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