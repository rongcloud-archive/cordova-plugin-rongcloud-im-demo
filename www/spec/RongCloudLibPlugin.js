var argscheck = require('cordova/argscheck');

var RongCloudLibPlugin = function() {};

RongCloudLibPlugin.prototype.init = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var appKey_ = getValue(options.appKey, null);
    var deviceToken_ = getValue(options.deviceToken, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","init", [appKey_, deviceToken_]);
};
RongCloudLibPlugin.prototype.connect = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var token_ = getValue(options.token, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","connect", [token_]);
};
RongCloudLibPlugin.prototype.reconnect = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","reconnect", []);
};
RongCloudLibPlugin.prototype.disconnect = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var isReceivePush_ = getValue(options.isReceivePush, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","disconnect", [isReceivePush_]);
};
RongCloudLibPlugin.prototype.setConnectionStatusListener = function(successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setConnectionStatusListener", []);
};
RongCloudLibPlugin.prototype.sendTextMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var text_ = getValue(options.text, null);
    var extra_ = getValue(options.extra, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendTextMessage", [conversationType_, targetId_, text_, extra_]);
};


RongCloudLibPlugin.prototype.sendImageMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var imagePath_ = getValue(options.imagePath, null);
    var extra_ = getValue(options.extra, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendImageMessage", [conversationType_, targetId_, imagePath_, extra_]);
};
RongCloudLibPlugin.prototype.sendVoiceMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var voicePath_ = getValue(options.voicePath, null);
    var duration_ = getValue(options.duration, null);
    var extra_ = getValue(options.extra, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendVoiceMessage", [conversationType_, targetId_, voicePath_, duration_, extra_]);
};
RongCloudLibPlugin.prototype.sendLocationMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var latitude_ = getValue(options.latitude, null);
    var longitude_ = getValue(options.longitude, null);
    var locationName_ = getValue(options.poi, null);
    var imagePath_ = getValue(options.imageUri, null);
    var extra_ = getValue(options.extra, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendLocationMessage", [conversationType_, targetId_, latitude_, longitude_, locationName_, imagePath_, imagePath_, extra_]);
};
RongCloudLibPlugin.prototype.sendRichContentMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var title_ = getValue(options.title, null);
    var content_ = getValue(options.description, null);
    var imageUrl_ = getValue(options.imageUrl, null);
    var extra_ = getValue(options.extra, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendRichContentMessage", [conversationType_, targetId_, title_, content_, imageUrl_, extra_]);
};
RongCloudLibPlugin.prototype.sendCommandNotificationMessage = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var name_ = getValue(options.name, null );
    var data_ = getValue(options.data, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","sendCommandNotificationMessage", [conversationType_, targetId_, name_, data_]);
};
RongCloudLibPlugin.prototype.setOnReceiveMessageListener = function(successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setOnReceiveMessageListener", []);
};
RongCloudLibPlugin.prototype.getConversationList = function(successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getConversationList", []);
};
RongCloudLibPlugin.prototype.getConversation = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getConversation", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.removeConversation = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","removeConversation", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.clearConversations = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationTypes_ = getValue(options.conversationTypes, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","clearConversations", [conversationTypes_]);
};
RongCloudLibPlugin.prototype.setConversationToTop = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var isTop_ = getValue(options.isTop, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setConversationToTop", [conversationType_, targetId_, isTop_]);
};
RongCloudLibPlugin.prototype.getConversationNotificationStatus = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getConversationNotificationStatus", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.setConversationNotificationStatus = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var conversationNotificationStatus_ = getValue(options.notificationStatus, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setConversationNotificationStatus", [conversationType_, targetId_,conversationNotificationStatus_]);
};
RongCloudLibPlugin.prototype.getLatestMessages = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var count_ = getValue(options.count, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getLatestMessages", [conversationType_, targetId_,count_]);
};
RongCloudLibPlugin.prototype.getHistoryMessages = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var count_ = getValue(options.count, null);
    var oldestMessageId_ = getValue(options.oldestMessageId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getHistoryMessages", [conversationType_, targetId_,count_, oldestMessageId_]);
};
RongCloudLibPlugin.prototype.getHistoryMessagesByObjectName = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var count_ = getValue(options.count, null);
    var oldestMessageId_ = getValue(options.oldestMessageId, null);
    var objectName_ = getValue(options.objectName, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getHistoryMessagesByObjectName", [conversationType_, targetId_,count_, oldestMessageId_, objectName_]);
};
RongCloudLibPlugin.prototype.deleteMessages = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var messageIds_  = getValue(options.messageIds, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","deleteMessages", [messageIds_]);
};
RongCloudLibPlugin.prototype.clearMessages = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","clearMessages", [conversationType_,targetId_]);
};
RongCloudLibPlugin.prototype.getTotalUnreadCount = function(successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getTotalUnreadCount", []);
};
RongCloudLibPlugin.prototype.getUnreadCount = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getUnreadCount", [conversationType_,targetId_]);
};
RongCloudLibPlugin.prototype.getUnreadCountByConversationTypes = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationTypes_ = getValue(options.conversationTypes, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getUnreadCountByConversationTypes", [conversationTypes_]);
};
RongCloudLibPlugin.prototype.setMessageReceivedStatus = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var messageId_ = getValue(options.messageId, null);
    var receivedStatus_ = getValue(options.receivedStatus, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setMessageReceivedStatus", [messageId_, receivedStatus_]);
};
RongCloudLibPlugin.prototype.clearMessagesUnreadStatus = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","clearMessagesUnreadStatus", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.setMessageExtra = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var messageId_ = getValue(options.messageId, null);
    var value_ = getValue(options.value, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setMessageExtra", [messageId_, value_]);
};
RongCloudLibPlugin.prototype.getTextMessageDraft = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getTextMessageDraft", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.saveTextMessageDraft = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    var content_ = getValue(options.content, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","saveTextMessageDraft", [conversationType_, targetId_, content_]);
};
RongCloudLibPlugin.prototype.clearTextMessageDraft = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var conversationType_ = getValue(options.conversationType, null);
    var targetId_ = getValue(options.targetId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","clearTextMessageDraft", [conversationType_, targetId_]);
};
RongCloudLibPlugin.prototype.createDiscussion = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var name_ = getValue(options.name, null);
    var userIds_ = getValue(options.userIdList, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","createDiscussion", [name_, userIds_]);
};
RongCloudLibPlugin.prototype.getDiscussion = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","getDiscussion", [discussionId_]);
};
RongCloudLibPlugin.prototype.setDiscussionName = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    var name_ = getValue(options.name, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setDiscussionName", [discussionId_, name_]);
};
RongCloudLibPlugin.prototype.addMemberToDiscussion = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    var userIds_ = getValue(options.userIdList, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","addMemberToDiscussion", [discussionId_, userIds_]);
};
RongCloudLibPlugin.prototype.removeMemberFromDiscussion = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    var userId_ = getValue(options.userId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","removeMemberFromDiscussion", [discussionId_, userId_]);
};
RongCloudLibPlugin.prototype.quitDiscussion = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","quitDiscussion", [discussionId_]);
};
RongCloudLibPlugin.prototype.setDiscussionInviteStatus = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var discussionId_ = getValue(options.discussionId, null);
    var inviteStatus_ = getValue(options.inviteStatus, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","setDiscussionInviteStatus", [discussionId_, inviteStatus_]);
};
RongCloudLibPlugin.prototype.syncGroup = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var groups_ = getValue(options.groups, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","syncGroup", [groups_]);
};
RongCloudLibPlugin.prototype.joinGroup = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var groupId_ = getValue(options.groupId, null);
    var groupName_ = getValue(options.groupName, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","joinGroup", [groupId_, groupName_]);
};
RongCloudLibPlugin.prototype.quitGroup = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
     var groupId_ = getValue(options.groupId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","quitGroup", [groupId_]);
};
RongCloudLibPlugin.prototype.joinChatRoom = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var chatRoomId_ = getValue(options.chatRoomId, null);
    var defMessageCount_ = getValue(options.defMessageCount, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","joinChatRoom", [chatRoomId_, defMessageCount_]);
};
RongCloudLibPlugin.prototype.quitChatRoom = function(successCallback, errorCallback, options) {
    var getValue = argscheck.getValue;
    options = options || {};
    var chatRoomId_ = getValue(options.chatRoomId, null);
    cordova.exec(successCallback, errorCallback, "RongCloudLibPlugin","quitChatRoom", [chatRoomId_]);
};
           
module.exports = new RongCloudLibPlugin();
