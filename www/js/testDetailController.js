angular.module('cordovaim.testdetail.controller', [])
  .controller('TestDetailCtrl', function($scope) {
    var expectResult;
    var messageId = 1;
    var id,type,alerttype;

    var jsonEqualsStruc = function(jsonA, jsonB) {
      var p;
      for (p in jsonA) {
        if (typeof(jsonB[p]) == 'undefined') {
          console.info('equalsStruc 1 break by ' + p);
          return false;
        }
      }

      for (p in jsonA) {
        if (jsonA[p]) {
          switch (typeof(jsonA[p])) {
            case 'object':
              if (!jsonEqualsStruc(jsonA[p], jsonB[p])) {
                console.info('equalsStruc 2 break by ' + p);
                return false;
              }
              break;
            case 'function':
              if (typeof(jsonB[p]) == 'undefined') {
                console.info('equalsStruc 3 break by ' + p);
                return false;
              }
              break;
            default:
          }
        } else {
          if (typeof(jsonA[p]) == 'undefined' && jsonB[p]) {
            console.info('equalsStruc 4 break by ' + p);
            return false;
          }
        }
      }

      for (p in jsonB) {
        if (typeof(jsonA[p]) == 'undefined') {
          console.info('equalsStruc 5 break by ' + p);
          return false;
        }
      }

      return true;
    };


    $scope.excute = function() {
      console.clear();
      id = $("#recID").val();
      type = $("#msgType").val();
      alerttype = $("#alertType").val();
      switch ($("#cmdType").val()) {
        case 'getConversationList':
          getConversationList();
          break;
        case 'getConversation':
          getConversation(type, id);
          break;
        case 'setConversationToTop':
          setConversationToTop(type, id);
          break;
        case 'removeConversation':
          removeConversation(type, id);
          break;
        case 'clearConversations':
          clearConversations(['PRIVATE', 'GROUP']);
          break;
        case 'getConversationNotificationStatus':
          getConversationNotificationStatus(type, id);
          break;
        case 'setConversationNotificationStatus':
          setConversationNotificationStatus(type, id, alerttype);
          break;
        case 'getLatestMessages':
          getLatestMessages(type, id, 5);
          break;
        case 'getHistoryMessages':
          getHistoryMessages(type,id,5);
          break;
        case 'getHistoryMessagesByObjectName':
          getHistoryMessagesByObjectName(type,id,5,10,"RC:TxtMsg");
          break;
        case 'getRemoteHistoryMessages':
          getRemoteHistoryMessages(type,id,5);
          break;
        case 'joinGroup':
          joinGroup(id,'group_'+id);
          break;
        case 'syncGroup':
          syncGroup();
          break;
        case 'quitGroup':
          quitGroup(id);
          break;
        case 'joinChatRoom':
          joinChatRoom(id,5);
          break;
        case 'quitChatRoom':
          quitChatRoom(id);
          break;
        case 'getConnectionStatus':
          getConnectionStatus();
          break;
        case 'addToBlacklist':
          addToBlacklist(id);
          break;
        case 'removeFromBlacklist':
          removeFromBlacklist(id);
          break;
        case 'getBlacklistStatus':
          getBlacklistStatus(id);
          break;
        case 'getBlacklist':
          getBlacklist();
          break;
        case 'setNotificationQuietHours':
          setNotificationQuietHours('22:00:00',6);
          break;
        case 'removeNotificationQuietHours':
          removeNotificationQuietHours();
          break;
        case 'getNotificationQuietHours':
          getNotificationQuietHours();
          break;
        case 'getCurrentUserId':
          getCurrentUserId();
          break;
        case 'clearMessages':
          clearMessages(type,id);
          break;
        case 'getTotalUnreadCount':
          getTotalUnreadCount();
          break;
        case 'getUnreadCount':
          getUnreadCount(type,id);
          break;
        case 'getUnreadCountByConversationTypes':
          getUnreadCountByConversationTypes(['PRIVATE', 'GROUP']);
          break;
        case 'setMessageReceivedStatus':
          setMessageReceivedStatus(id,'READ');
          break;
        case 'clearMessagesUnreadStatus':
          clearMessagesUnreadStatus(type,id);
          break;
        case 'setMessageExtra':
          setMessageExtra(id,'test');
          break;
        case 'getTextMessageDraft':
          getTextMessageDraft(type,id);
          break;
        case 'saveTextMessageDraft':
          saveTextMessageDraft(type,id,'testDraft');
          break;
        case 'clearTextMessageDraft':
          clearTextMessageDraft(type,id);
          break;
        case 'setMessageSentStatus':
          setMessageSentStatus(id,'READ');
          break;
        case 'clearConversations':
          clearConversations(['PRIVATE', 'GROUP']);
          break;
        case 'logout':
          logout();
          break;
        case 'deleteMessages':
          deleteMessages([1,2]);
          break;
        case 'createDiscussion':
          createDiscussion('testDiscuss',["77562"]);
          break;
        case 'getDiscussion':
          getDiscussion(localStorage["discussionId"]);
          break;
        case 'setDiscussionName':
          setDiscussionName(localStorage["discussionId"],"test_discussion_name");
          break;
        case 'addMemberToDiscussion':
          addMemberToDiscussion(localStorage["discussionId"],["orange"]);
          break;
        case 'removeMemberFromDiscussion':
          removeMemberFromDiscussion(localStorage["discussionId"],id);
          break;
        case 'quitDiscussion':
          quitDiscussion(localStorage["discussionId"]);
          break;
        case 'setDiscussionInviteStatus':
          setDiscussionInviteStatus(localStorage["discussionId"],"CLOSED");
          break;
        default:

      }
    }

    var getConversationList = function() {
      RongCloudLibPlugin.getConversationList(
        function(ret, err) {
          if (ret) {
            console.log("getConversationList:" + JSON.stringify(ret));
            if (ret.result.length == 0) {
              console.info("getConversationList结果为空,无法比较!");
              return;
            }
            expectResult = {
              status: 'success',
              result: [{
                conversationTitle: 'Ironman', // 会话标题
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                draft: '', // 文字消息草稿的内容
                targetId: 'group001', // 消息目标 Id
                latestMessage: {
                  text: 'Hello world!',
                  extra: ''
                }, // 最后一条消息的内容
                sentStatus: 'SENT', // 参见 发送出的消息状态
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                receivedStatus: 'READ', // 参见 接收到的消息状态
                senderUserId: '55', // 发送消息的用户 Id
                unreadMessageCount: 10, // 本会话的未读消息数
                receivedTime: 1418968547905, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                sentTime: 1418968488063, // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                isTop: false, // 置顶状态
                latestMessageId: 608 // 本会话最后一条消息 Id
              }]
            };
            switch (ret.result[0].objectName) {
              case 'RC:ImgMsg':
                expectResult.result[0].latestMessage = {
                  "localPath": "bhZPzJXimRwrtvc=",
                  "thumbPath": "http://p1.cdn.com/fds78ruhi.jpg",
                  "extra": ""
                };
                break;
              case 'RC:VcMsg':
                expectResult.result[0].latestMessage = {
                  "voicePath": "bhZPzJXimRwrtvc=",
                  "duration": 7,
                  "extra": ""
                };
                break;

              case 'RC:ImgTextMsg':
                expectResult.result[0].latestMessage = {
                  "title": "Big News",
                  "description": "I'm Ironman.",
                  "imageUrl": "http://p1.cdn.com/fds78ruhi.jpg",
                  "extra": "",
                  "url": ""
                };
                break;
              case 'RC:LBSMsg':
                expectResult.result[0].latestMessage = {
                  "imagePath": "/data/data",
                  "poi": "bhZPzJXimRwrtvc=",
                  "latitude": 39.9139,
                  "longitude": 116.3917,
                  "poi": "北京市朝阳区北苑路北辰泰岳大厦",
                  "extra": ""
                };
                break;
              case 'RC:DizNtf':
                expectResult.result[0].latestMessage = {
                  "type": 1,
                  "extension": "3213,4332",
                  "operator": "5435"
                };
                break;
              default:

            }
            if (jsonEqualsStruc(expectResult.result[0], ret.result[0]))
              console.info("getConversationList success!");
            else {
              console.error("getConversationList error!");
              console.error("expected:" + JSON.stringify(expectResult.result[0]));
              console.error("actural:" + JSON.stringify(ret.result[0]));
            }
          }
          if (err) {
            alert('getConversationList err:' + JSON.stringify(err));
          }

        }
      );

    }

    var getConversation = function(type, id) {
      RongCloudLibPlugin.getConversation({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getConversation:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: {
                conversationTitle: 'Ironman', // 会话标题
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                draft: '', // 文字消息草稿的内容
                targetId: 'group001', // 消息目标 Id
                latestMessage: {
                  text: 'Hello world!',
                  extra: ''
                }, // 最后一条消息的内容
                sentStatus: 'SENT', // 参见 发送出的消息状态
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                recievedStatus: 0, // 参见 接收到的消息状态
                senderUserId: '55', // 发送消息的用户 Id
                unreadMessageCount: 10, // 本会话的未读消息数
                receivedTime: 1418968547905, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                sentTime: 1418968488063, // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                isTop: false, // 置顶状态
                latestMessageId: 608 // 本会话最后一条消息 Id
              }
            };

            switch (ret.objectName) {
              case 'RC:ImgMsg':
                expectResult.result.latestMessage = {
                  "localPath": "bhZPzJXimRwrtvc=",
                  "thumbPath": "http://p1.cdn.com/fds78ruhi.jpg",
                  "extra": ""
                };
                break;
              case 'RC:VcMsg':
                expectResult.result.latestMessage = {
                  "voicePath": "bhZPzJXimRwrtvc=",
                  "duration": 7,
                  "extra": ""
                };
                break;
              case 'RC:ImgTextMsg':
                expectResult.result.latestMessage = {
                  "title": "Big News",
                  "description": "I'm Ironman.",
                  "imageUrl": "http://p1.cdn.com/fds78ruhi.jpg",
                  "extra": "",
                  "url": ""
                };
                break;
              case 'RC:LBSMsg':
                expectResult.result.latestMessage = {
                  "imagePath": "/data/data",
                  "poi": "bhZPzJXimRwrtvc=",
                  "latitude": 39.9139,
                  "longitude": 116.3917,
                  "poi": "北京市朝阳区北苑路北辰泰岳大厦",
                  "extra": ""
                };
                break;
              case 'RC:DizNtf':
                expectResult.result.latestMessage = {
                  "type": 1,
                  "extension": "3213,4332",
                  "operator": "5435"
                };
                break;
              default:

            }
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getConversation success!");
            else {
              console.error("getConversation error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('getConversation err:' + JSON.stringify(err));
          }

        }
      );
    }

    var setConversationToTop = function(type, id) {
      RongCloudLibPlugin.setConversationToTop({
          conversationType: type,
          targetId: id,
          isTop: true
        },
        function(ret, err) {
          if (ret) {
            console.log("setConversationToTop:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("setConversationToTop success!");
            else {
              console.error("setConversationToTop error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('setConversationToTop err:' + JSON.stringify(err));
          }

        }
      );

    }

    var removeConversation = function(type, id) {
      RongCloudLibPlugin.removeConversation({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("removeConversation:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("removeConversation success!");
            else {
              console.error("removeConversation error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('removeConversation err:' + JSON.stringify(err));
          }

        }
      );

    }
    var clearConversations = function(arr) {
      RongCloudLibPlugin.clearConversations({
          conversationTypes: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("clearConversations:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("clearConversations success!");
            else {
              console.error("clearConversations error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('clearConversations err:' + JSON.stringify(err));
          }

        }
      );

    }

    var getConversationNotificationStatus = function(type, id) {
      RongCloudLibPlugin.getConversationNotificationStatus({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getConversationNotificationStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: {
                code: 0, // 状态码，0：免打扰 / 1：提醒
                notificationStatus: 'DO_NOT_DISTURB' // 参见 会话通知提醒状态 枚举
              }
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("getConversationNotificationStatus success!");
            else {
              console.error("getConversationNotificationStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('getConversationNotificationStatus err:' + JSON.stringify(err));
          }

        }
      );

    }
    var setConversationNotificationStatus = function(type, id, alerttype) {
      RongCloudLibPlugin.setConversationNotificationStatus({
          conversationType: type,
          targetId: id,
          notificationStatus: alerttype
        },
        function(ret, err) {
          if (ret) {
            console.log("setConversationNotificationStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: {
                code: 0, // 状态码，0：免打扰 / 1：提醒
                notificationStatus: "DO_NOT_DISTURB" // 参见 会话通知提醒状态 枚举
              }
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("setConversationNotificationStatus success!");
            else {
              console.error("setConversationNotificationStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('setConversationNotificationStatus err:' + JSON.stringify(err));
          }

        }
      );

    }
    var getLatestMessages = function(type, id, count) {
      RongCloudLibPlugin.getLatestMessages({
          conversationType: type,
          targetId: id,
          count: count
        },
        function(ret, err) {
          if (ret) {
            console.log("getLatestMessages:" + JSON.stringify(ret));
            if (ret.result.length == 0) {
              console.info("getLatestMessages结果为空,无法比较!");
              return;
            }
            expectResult = {
              status: 'success',
              result: [{
                content: {
                  text: 'Hello world!',
                  extra: ''
                }, // 消息内容
                extra: '', // 消息的附加信息，此信息只保存在本地
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                targetId: '55', // 这里对应消息发送者的 userId
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                sentStatus: 'SENDING', // 参见 发送出的消息状态
                senderUserId: '55', // 发送者 userId
                messageId: 608, // 本地消息 Id
                sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
              }]
            };

            if (jsonEqualsStruc(expectResult.result[0], ret.result[0]))
              console.info("getLatestMessages success!");
            else {
              console.error("getLatestMessages error!");
              console.error("expected:" + JSON.stringify(expectResult.result[0]));
              console.error("actural:" + JSON.stringify(ret.result[0]));
            }
          }
          if (err) {
            alert('getLatestMessages err:' + JSON.stringify(err));
          }

        }
      );

    }

    var getHistoryMessages = function(type,id,count) {
      RongCloudLibPlugin.getHistoryMessages({
          conversationType: type,
          targetId: id,
          count: count,
          oldestMessageId: 10
        },
        function(ret, err) {
          if (ret) {
            console.log("getHistoryMessages:" + JSON.stringify(ret));
            if (ret.result.length == 0) {
              console.info("getHistoryMessages结果为空,无法比较!");
              return;
            }
            expectResult = {
              status: 'success',
              result: [{
                content: {
                  text: 'Hello world!',
                  extra: ''
                }, // 消息内容
                extra: '', // 消息的附加信息，此信息只保存在本地
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                targetId: '55', // 这里对应消息发送者的 userId
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                sentStatus: 'SENDING', // 参见 发送出的消息状态
                senderUserId: '55', // 发送者 userId
                messageId: 608, // 本地消息 Id
                sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
              }]
            };

            if (jsonEqualsStruc(expectResult.result[0], ret.result[0]))
              console.info("getHistoryMessages success!");
            else {
              console.error("getHistoryMessages error!");
              console.error("expected:" + JSON.stringify(expectResult.result[0]));
              console.error("actural:" + JSON.stringify(ret.result[0]));
            }
          }
          if (err) {
            alert('getHistoryMessages err:' + JSON.stringify(err));
          }

        }
      );
    }

    var getHistoryMessagesByObjectName = function(type,id,count,oldmsgid,object) {
      RongCloudLibPlugin.getHistoryMessagesByObjectName({
          conversationType: type,
          targetId: id,
          count: count,
          oldestMessageId: oldmsgid,
          objectName: object
        },
        function(ret, err) {
          if (ret) {
            console.log("getHistoryMessagesByObjectName:" + JSON.stringify(ret));
            if (ret.result.length == 0) {
              console.info("getHistoryMessagesByObjectName结果为空,无法比较!");
              return;
            }
            expectResult = {
              status: 'success',
              result: [{
                content: {
                  text: 'Hello world!',
                  extra: ''
                }, // 消息内容
                extra: '', // 消息的附加信息，此信息只保存在本地
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                targetId: '55', // 这里对应消息发送者的 userId
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                sentStatus: 'SENDING', // 参见 发送出的消息状态
                senderUserId: '55', // 发送者 userId
                messageId: 608, // 本地消息 Id
                sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
              }]
            };

            if (jsonEqualsStruc(expectResult.result[0], ret.result[0]))
              console.info("getHistoryMessagesByObjectName success!");
            else {
              console.error("getHistoryMessagesByObjectName error!");
              console.error("expected:" + JSON.stringify(expectResult.result[0]));
              console.error("actural:" + JSON.stringify(ret.result[0]));
            }
          }
          if (err) {
            alert('getHistoryMessagesByObjectName err:' + JSON.stringify(err));
          }

        }
      );
    }

    var getRemoteHistoryMessages = function(type,id,count) {
      //此方法实际返回值多了receivedStatus
      RongCloudLibPlugin.getRemoteHistoryMessages({
          conversationType: type,
          targetId: id,
          count: count,
          dateTime: 0
        },
        function(ret, err) {
          if (ret) {
            console.log("getRemoteHistoryMessages:" + JSON.stringify(ret));
            if (ret.result.length == 0) {
              console.info("getRemoteHistoryMessages结果为空,无法比较!");
              return;
            }
            expectResult = {
              status: 'success',
              result: [{
                content: {
                  text: 'Hello world!',
                  extra: ''
                }, // 消息内容
                extra: '', // 消息的附加信息，此信息只保存在本地
                conversationType: 'PRIVATE', // 参见 会话类型 枚举
                messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                targetId: '55', // 这里对应消息发送者的 userId
                objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                sentStatus: 'SENDING', // 参见 发送出的消息状态
                senderUserId: '55', // 发送者 userId
                messageId: 608, // 本地消息 Id
                sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
              }]
            };

            if (jsonEqualsStruc(expectResult.result[0], ret.result[0]))
              console.info("getRemoteHistoryMessages success!");
            else {
              console.error("getRemoteHistoryMessages error!");
              console.error("expected:" + JSON.stringify(expectResult.result[0]));
              console.error("actural:" + JSON.stringify(ret.result[0]));
            }
          }
          if (err) {
            alert('getRemoteHistoryMessages err:' + JSON.stringify(err));
          }

        }
      );
    }

    var joinGroup = function(id,name) {
      RongCloudLibPlugin.joinGroup({
          groupId: id,
          groupName: name
        },
        function(ret, err) {
          if (ret) {
            console.log("joinGroup:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("joinGroup success!");
            else {
              console.error("joinGroup error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("joinGroup error:" + JSON.stringify(err));
          }
        }
      );
    }

    var syncGroup = function() {
      RongCloudLibPlugin.syncGroup({
          groups: [{
            id: "group_id",
            name: "group_name",
            portraitUrl: ""
          }]
        },
        function(ret, err) {
          if (ret) {
            console.log("syncGroup:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("syncGroup success!");
            else {
              console.error("syncGroup error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("syncGroup error:" + JSON.stringify(err));
          }
        }
      );
    }

    var quitGroup = function(id) {
      RongCloudLibPlugin.quitGroup({
          groupId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("quitGroup:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("quitGroup success!");
            else {
              console.error("quitGroup error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("quitGroup error:" + JSON.stringify(err));
          }
        }
      );
    }

    var joinChatRoom = function(id,count) {

          RongCloudLibPlugin.joinChatRoom({
              chatRoomId: id,
              defMessageCount: count
            },
            function(ret, err) {
              if (ret) {
                console.log("joinChatRoom:" + JSON.stringify(ret));
                expectResult = {
                  status: 'success' // 状态码：success / error
                };
                if (jsonEqualsStruc(expectResult, ret))
                  console.info("joinChatRoom success!");
                else {
                  console.error("joinChatRoom error!");
                  console.error("expected:" + JSON.stringify(expectResult));
                  console.error("actural:" + JSON.stringify(ret));
                }
              }
              if (err) {
                alert("joinChatRoom error:" + JSON.stringify(err));
              }
            }
          );
    }

    var quitChatRoom = function(id) {
      RongCloudLibPlugin.quitChatRoom({
          chatRoomId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("quitChatRoom:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("quitChatRoom success!");
            else {
              console.error("quitChatRoom error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("quitChatRoom error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getConnectionStatus = function() {
      RongCloudLibPlugin.getConnectionStatus(
        function(ret, err) {
          if (ret) {
            console.log("getConnectionStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: {
                connectionStatus: 'CONNECTED' // 连接状态
              }
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getConnectionStatus success!");
            else {
              console.error("getConnectionStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getConnectionStatus error:" + JSON.stringify(err));
          }
        }
      );
    }

    var addToBlacklist = function(id) {
      RongCloudLibPlugin.addToBlacklist({
          userId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("addToBlacklist:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("addToBlacklist success!");
            else {
              console.error("addToBlacklist error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("addToBlacklist error:" + JSON.stringify(err));
          }
        }
      );
    }

    var removeFromBlacklist = function(id) {
      RongCloudLibPlugin.removeFromBlacklist({
          userId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("removeFromBlacklist:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("removeFromBlacklist success!");
            else {
              console.error("removeFromBlacklist error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("removeFromBlacklist error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getBlacklistStatus = function(id) {
      RongCloudLibPlugin.getBlacklistStatus({
          userId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getBlacklistStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: 1 // 1-不在黑名单；0-在黑名单
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getBlacklistStatus success!");
            else {
              console.error("getBlacklistStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getBlacklistStatus error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getBlacklist = function() {
      RongCloudLibPlugin.getBlacklist(
        function(ret, err) {
          if (ret) {
            console.log("getBlacklist:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: ['aaa', 'bbb']
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getBlacklist success!");
            else {
              console.error("getBlacklist error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getBlacklist error:" + JSON.stringify(err));
          }
        }
      );
    }

    var setNotificationQuietHours = function(time,span) {
      RongCloudLibPlugin.setNotificationQuietHours({
          startTime: time,
          spanMinutes: span
        },
        function(ret, err) {
          if (ret) {
            console.log("setNotificationQuietHours:" + JSON.stringify(ret));
            expectResult = {
              status: 'success'
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setNotificationQuietHours success!");
            else {
              console.error("setNotificationQuietHours error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setNotificationQuietHours error:" + JSON.stringify(err));
          }
        }
      );
    }

    var removeNotificationQuietHours = function() {
      RongCloudLibPlugin.removeNotificationQuietHours(
        function(ret, err) {
          if (ret) {
            console.log("removeNotificationQuietHours:" + JSON.stringify(ret));
            expectResult = {
              status: 'success'
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("removeNotificationQuietHours success!");
            else {
              console.error("removeNotificationQuietHours error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("removeNotificationQuietHours error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getNotificationQuietHours = function() {
      RongCloudLibPlugin.getNotificationQuietHours(
        function(ret, err) {
          if (ret) {
            console.log("getNotificationQuietHours:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: {
                startTime: "22:00:00", // 起始时间
                spanMinutes: 6 // 间隔分钟数
              }
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getNotificationQuietHours success!");
            else {
              console.error("getNotificationQuietHours error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getNotificationQuietHours error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getCurrentUserId = function() {
      RongCloudLibPlugin.getCurrentUserId(
        function(ret, err) {
          if (ret) {
            console.log("getCurrentUserId:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: 'apple' // 当前连接用户
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getCurrentUserId success!");
            else {
              console.error("getCurrentUserId error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getCurrentUserId error:" + JSON.stringify(err));
          }
        }
      );
    }

    var clearMessages = function(type,id) {
      RongCloudLibPlugin.clearMessages({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("clearMessages:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("clearMessages success!");
            else {
              console.error("clearMessages error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("clearMessages error:" + JSON.stringify(err));
          }
        }
      );
    }

    var getTotalUnreadCount = function() {
      RongCloudLibPlugin.getTotalUnreadCount(
        function(ret, err) {
          if (ret) {
            console.log("getTotalUnreadCount:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: 12 // 未读消息数
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getTotalUnreadCount success!");
            else {
              console.error("getTotalUnreadCount error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getTotalUnreadCount error:" + JSON.stringify(err));
          }
        }
      );

    }

    var getUnreadCount = function(type,id) {
      RongCloudLibPlugin.getUnreadCount({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getUnreadCount:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: 12 // 未读消息数
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getUnreadCount success!");
            else {
              console.error("getUnreadCount error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getUnreadCount error:" + JSON.stringify(err));
          }
        }
      );

    }

    var getUnreadCountByConversationTypes = function(arr) {
      RongCloudLibPlugin.getUnreadCountByConversationTypes({
          conversationTypes: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("getUnreadCountByConversationTypes:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: 12 // 未读消息数
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getUnreadCountByConversationTypes success!");
            else {
              console.error("getUnreadCountByConversationTypes error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getUnreadCountByConversationTypes error:" + JSON.stringify(err));
          }
        }
      );

    }

    var setMessageReceivedStatus = function(id,status) {
      RongCloudLibPlugin.setMessageReceivedStatus({
          messageId: id,
          receivedStatus: status
        },
        function(ret, err) {
          if (ret) {
            console.log("setMessageReceivedStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setMessageReceivedStatus success!");
            else {
              console.error("setMessageReceivedStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setMessageReceivedStatus error:" + JSON.stringify(err));
          }
        }
      );

    }

    var clearMessagesUnreadStatus = function(type,id) {
      RongCloudLibPlugin.clearMessagesUnreadStatus({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("clearMessagesUnreadStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("clearMessagesUnreadStatus success!");
            else {
              console.error("clearMessagesUnreadStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("clearMessagesUnreadStatus error:" + JSON.stringify(err));
          }
        }
      );
    }

    var setMessageExtra = function(id,text) {
      RongCloudLibPlugin.setMessageExtra({
          messageId: id,
          value: text
        },
        function(ret, err) {
          if (ret) {
            console.log("setMessageExtra:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setMessageExtra success!");
            else {
              console.error("setMessageExtra error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setMessageExtra error:" + JSON.stringify(err));
          }
        }
      );

    }

    var getTextMessageDraft = function(type,id) {
      RongCloudLibPlugin.getTextMessageDraft({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getTextMessageDraft:" + JSON.stringify(ret));
            expectResult = {
              status: 'success',
              result: 'Hello w' // 草稿的文字内容
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getTextMessageDraft success!");
            else {
              console.error("getTextMessageDraft error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getTextMessageDraft error:" + JSON.stringify(err));
          }
        }
      );

    }

    var saveTextMessageDraft = function(type,id,content) {
      RongCloudLibPlugin.saveTextMessageDraft({
          conversationType: type,
          targetId: id,
          content: content
        },
        function(ret, err) {
          if (ret) {
            console.log("saveTextMessageDraft:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("saveTextMessageDraft success!");
            else {
              console.error("saveTextMessageDraft error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("saveTextMessageDraft error:" + JSON.stringify(err));
          }
        }
      );

    }

    var clearTextMessageDraft = function(type,id) {
      RongCloudLibPlugin.clearTextMessageDraft({
          conversationType: type,
          targetId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("clearTextMessageDraft:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("clearTextMessageDraft success!");
            else {
              console.error("clearTextMessageDraft error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("clearTextMessageDraft error:" + JSON.stringify(err));
          }
        }
      );

    }

    var setMessageSentStatus = function(id,status) {
      RongCloudLibPlugin.setMessageSentStatus({
          messageId: id,
          sentStatus: status
        },
        function(ret, err) {
          if (ret) {
            console.log("setMessageSentStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success'
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setMessageSentStatus success!");
            else {
              console.error("setMessageSentStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setMessageSentStatus error:" + JSON.stringify(err));
          }
        }
      );

    }

    var clearConversations = function(arr) {
      RongCloudLibPlugin.clearConversations({
          conversationTypes: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("clearConversations:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };

            if (jsonEqualsStruc(expectResult, ret))
              console.info("clearConversations success!");
            else {
              console.error("clearConversations error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert('clearConversations err:' + JSON.stringify(err));
          }

        }
      );

    }

    var logout = function() {
      RongCloudLibPlugin.logout(
        function(ret, err) {
          if (ret) {
            console.log("logout:" + JSON.stringify(ret));
            expectResult = {
              status: 'success'
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("logout success!");
            else {
              console.error("logout error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("logout error:" + JSON.stringify(err));
          }
        }
      );
    }

    var deleteMessages = function(arr) {
      RongCloudLibPlugin.deleteMessages({
          messageIds: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("deleteMessages:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("deleteMessages success!");
            else {
              console.error("deleteMessages error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("deleteMessages error:" + JSON.stringify(err));
          }
        }
      );

    }

    var createDiscussion = function(name,arr) {
      RongCloudLibPlugin.createDiscussion({
          name: name,
          userIdList: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("createDiscussion:" + JSON.stringify(ret));
            localStorage["discussionId"] = ret.result.discussionId;
            expectResult = {
              status: 'success', // 状态码：success / error
              result: {
                discussionId: "1b9f7abe-a5ae-463d-8ff8-d96deaf40b59" // 创建成功的讨论组 Id
              }
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("createDiscussion success!");
            else {
              console.error("createDiscussion error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("createDiscussion error:" + JSON.stringify(err));
          }
        }
      );

    }

    var getDiscussion = function(id) {
      RongCloudLibPlugin.getDiscussion({
          discussionId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("getDiscussion:" + JSON.stringify(ret));
            expectResult = {
              status: 'success', // 状态码：success / error
              result: {
                creatorId: '55', // 讨论组创建者 Id
                id: '1b9f7abe-a5ae-463d-8ff8-d96deaf40b59', //讨论组 Id
                name: 'Ironman, Batman', // 讨论组名称
                memberIdList: ['1234', '4321'], // 成员 Id 列表
                inviteStatus: 'OPENED' // 是否公开好友邀请：OPENED / CLOSED，参见 讨论组邀请状态
              }
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("getDiscussion success!");
            else {
              console.error("getDiscussion error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("getDiscussion error:" + JSON.stringify(err));
          }
        }
      );
    }

    var setDiscussionName = function(id,name) {
      RongCloudLibPlugin.setDiscussionName({
          discussionId: id,
          name: name
        },
        function(ret, err) {
          if (ret) {
            console.log("setDiscussionName:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setDiscussionName success!");
            else {
              console.error("setDiscussionName error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setDiscussionName error:" + JSON.stringify(err));
          }
        }
      );

    }

    var addMemberToDiscussion = function(id,arr) {
      RongCloudLibPlugin.addMemberToDiscussion({
          discussionId: id,
          userIdList: arr
        },
        function(ret, err) {
          if (ret) {
            console.log("addMemberToDiscussion:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("addMemberToDiscussion success!");
            else {
              console.error("addMemberToDiscussion error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("addMemberToDiscussion error:" + JSON.stringify(err));
          }
        }
      );

    }

    var removeMemberFromDiscussion = function(discussid,id) {
      RongCloudLibPlugin.removeMemberFromDiscussion({
          discussionId: discussid,
          userId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("removeMemberFromDiscussion:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("removeMemberFromDiscussion success!");
            else {
              console.error("removeMemberFromDiscussion error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("removeMemberFromDiscussion error:" + JSON.stringify(err));
          }
        }
      );

    }

    var quitDiscussion = function(id) {
      RongCloudLibPlugin.quitDiscussion({
          discussionId: id
        },
        function(ret, err) {
          if (ret) {
            console.log("quitDiscussion:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("quitDiscussion success!");
            else {
              console.error("quitDiscussion error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("quitDiscussion error:" + JSON.stringify(err));
          }
        }
      );

    }

    var setDiscussionInviteStatus = function(id,status) {
      RongCloudLibPlugin.setDiscussionInviteStatus({
          discussionId: id,
          inviteStatus: status
        },
        function(ret, err) {
          if (ret) {
            console.log("setDiscussionInviteStatus:" + JSON.stringify(ret));
            expectResult = {
              status: 'success' // 状态码：success / error
            };
            if (jsonEqualsStruc(expectResult, ret))
              console.info("setDiscussionInviteStatus success!");
            else {
              console.error("setDiscussionInviteStatus error!");
              console.error("expected:" + JSON.stringify(expectResult));
              console.error("actural:" + JSON.stringify(ret));
            }
          }
          if (err) {
            alert("setDiscussionInviteStatus error:" + JSON.stringify(err));
          }
        }
      );

    }

    // var setConversationToTop = function() {
    //
    // }













    //
    // RongCloudLibPlugin.sendTextMessage({
    //     conversationType: type,
    //     targetId: id,
    //     text: "hello world from testController",
    //     extra: "this is a extra text"
    //   },
    //   function(ret, err) {
    //     if (ret) {
    //       if (ret.status == 'prepare') {
    //         //ios此处返回值比文档多了字段recievedStatus 可以忽略
    //         expectResult = {
    //           status: 'prepare', // 状态码：prepare / success / error
    //           result: {
    //             message: {
    //               content: {
    //                 text: 'Hello world!',
    //                 extra: ''
    //               }, // 消息内容
    //               extra: '',
    //               conversationType: 'PRIVATE', // 参见 会话类型 枚举
    //               messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
    //               targetId: '16', // 接收者 Id
    //               objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
    //               sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
    //               senderUserId: '55', // 发送者 userId
    //               messageId: 608, // 本地消息 Id
    //               sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
    //               receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
    //             }
    //           }
    //         };
    //         if (jsonEqualsStruc(expectResult, ret))
    //           console.info("sendTextMessage prepare success!");
    //         else {
    //           console.error("sendTextMessage prepare error!");
    //           console.error("expected:" + JSON.stringify(expectResult));
    //           console.error("actural:" + JSON.stringify(ret));
    //         }
    //       } else {
    //         expectResult = {
    //           status: 'success', // 状态码：prepare / success / error
    //           result: {
    //             message: {
    //               messageId: 608 // 本地消息 Id
    //             }
    //           }
    //         };
    //         if (jsonEqualsStruc(expectResult, ret))
    //           console.info("sendTextMessage success!");
    //         else {
    //           console.error("sendTextMessage error!");
    //           console.error("expected:" + JSON.stringify(expectResult));
    //           console.error("actural:" + JSON.stringify(ret));
    //         }
    //       }
    //     }
    //     if (err) {
    //       alert("sendTextMessage error:" + JSON.stringify(err));
    //     }
    //
    //   }
    //
    // );
    //











  });
