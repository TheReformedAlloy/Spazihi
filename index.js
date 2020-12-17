require('dotenv').config();
const block = require('./lib/groupme/block');
const bot = require('./lib/groupme/bot');
const chat = require('./lib/groupme/chat');
const directMessage = require('./lib/groupme/directMessage');
const group = require('./lib/groupme/group');
const groupMessage = require('./lib/groupme/groupMessage');
const leaderboard = require('./lib/groupme/leaderboard');
const like = require('./lib/groupme/like');
const member = require('./lib/groupme/member');
const smsMode = require('./lib/groupme/smsMode');
const user = require('./lib/groupme/user');

exports.GroupMeClient = function(apiToken) {
    if(apiToken) {
        process.env.apiToken = apiToken;
        return {
            block,
            bot,
            chat,
            directMessage,
            group,
            groupMessage,
            leaderboard,
            like,
            member,
            smsMode,
            user
        }
    } else {
        throw new Error('Must include GroupMe API token on creation of Client.');
    }
}