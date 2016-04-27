angular.module('cordovaim.test.controller', [])
  .controller('TestCtrl', function($scope) {
    var expectResult;
    var messageId = 1;
    var jsonEqualsStruc = function(jsonA, jsonB) {
      var p;
      for(p in jsonA) {
          if(typeof(jsonB[p])=='undefined') {console.info('equalsStruc 1 break by ' + p);return false;}
      }

      for(p in jsonA) {
          if (jsonA[p]) {
              switch(typeof(jsonA[p])) {
                  case 'object':
                      if (!jsonEqualsStruc(jsonA[p], jsonB[p])) { console.info('equalsStruc 2 break by ' + p);return false; } break;
                  case 'function':
                      if (typeof(jsonB[p])=='undefined' ){
                        console.info('equalsStruc 3 break by ' + p);
                        return false;
                      }
                      break;
                  default:
              }
          } else {
              if (typeof(jsonA[p])=='undefined' && jsonB[p]){
                  console.info('equalsStruc 4 break by ' + p);
                  return false;
              }
          }
      }

      for(p in jsonB) {
          if(typeof(jsonA[p])=='undefined') {
            console.info('equalsStruc 5 break by ' + p);
            return false;
          }
      }

      return true;
    };

    var testApp = {
          step0: function() {
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
                        expectResult.result[0].latestMessage = {"localPath":"bhZPzJXimRwrtvc=","thumbPath":"http://p1.cdn.com/fds78ruhi.jpg","extra":""};
                        break;
                      case 'RC:VcMsg':
                        expectResult.result[0].latestMessage = {"voicePath":"bhZPzJXimRwrtvc=","duration":7,"extra":""};
                        break;

                      case 'RC:ImgTextMsg':
                        expectResult.result[0].latestMessage = {"title":"Big News","description":"I'm Ironman.","imageUrl":"http://p1.cdn.com/fds78ruhi.jpg","extra":"","url":""};
                        break;
                      case 'RC:LBSMsg':
                        expectResult.result[0].latestMessage = {"imagePath":"/data/data","poi":"bhZPzJXimRwrtvc=","latitude":39.9139,"longitude":116.3917,"poi":"北京市朝阳区北苑路北辰泰岳大厦","extra":""};
                        break;
                      case 'RC:DizNtf':
                        expectResult.result[0].latestMessage = {"type":1,"extension":"3213,4332","operator":"5435"};
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

              RongCloudLibPlugin.getConversation({
                  conversationType: "PRIVATE",
                  targetId: "apple"
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
                        expectResult.result.latestMessage = {"localPath":"bhZPzJXimRwrtvc=","thumbPath":"http://p1.cdn.com/fds78ruhi.jpg","extra":""};
                        break;
                      case 'RC:VcMsg':
                        expectResult.result.latestMessage = {"voicePath":"bhZPzJXimRwrtvc=","duration":7,"extra":""};
                        break;
                      case 'RC:ImgTextMsg':
                        expectResult.result.latestMessage = {"title":"Big News","description":"I'm Ironman.","imageUrl":"http://p1.cdn.com/fds78ruhi.jpg","extra":"","url":""};
                        break;
                      case 'RC:LBSMsg':
                        expectResult.result.latestMessage = {"imagePath":"/data/data","poi":"bhZPzJXimRwrtvc=","latitude":39.9139,"longitude":116.3917,"poi":"北京市朝阳区北苑路北辰泰岳大厦","extra":""};
                        break;
                      case 'RC:DizNtf':
                        expectResult.result.latestMessage = {"type":1,"extension":"3213,4332","operator":"5435"};
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

              RongCloudLibPlugin.setConversationToTop({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  isTop: true
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.removeConversation({
                  conversationType: "PRIVATE",
                  targetId: "apple"
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.clearConversations({
                  conversationTypes: ['PRIVATE', 'GROUP']
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.getConversationNotificationStatus({
                  conversationType: "PRIVATE",
                  targetId: "apple"
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.setConversationNotificationStatus({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  notificationStatus: "DO_NOT_DISTURB"
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.getLatestMessages({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  count: 2
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.getHistoryMessages({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  count: 2,
                  oldestMessageId: 10
                },
                function(ret, err) {
                  if (ret) {
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

              RongCloudLibPlugin.getHistoryMessagesByObjectName({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  count: 2,
                  oldestMessageId: 10,
                  objectName: "RC:TxtMsg"
                },
                function(ret, err) {
                  if (ret) {
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

              //此方法实际返回值多了receivedStatus
              RongCloudLibPlugin.getRemoteHistoryMessages({
                  conversationType: "PRIVATE",
                  targetId: "apple",
                  count: 2,
                  dateTime: 0
                },
                function(ret, err) {
                  if (ret) {
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

            },
        step1: function() {

          RongCloudLibPlugin.joinGroup({
              groupId: "group_id",
              groupName: "group_name"
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.syncGroup({
              groups: [{
                id: "group_id",
                name: "group_name",
                portraitUrl: ""
              }]
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.quitGroup({
              groupId: "group_id"
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.joinChatRoom({
              chatRoomId: "chatroom",
              defMessageCount: 10
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.quitChatRoom({
              chatRoomId: "chatroom"
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.getConnectionStatus(
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.addToBlacklist({
              userId: 'apple'
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.removeFromBlacklist({
              userId: 'apple'
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.getBlacklistStatus({
              userId: 'apple'
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.getBlacklist(
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.setNotificationQuietHours({
              startTime: '22:00:00',
              spanMinutes: 6
            },
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.removeNotificationQuietHours(
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.getNotificationQuietHours(
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.getCurrentUserId(
            function(ret, err) {
              if (ret) {
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

          RongCloudLibPlugin.createDiscussion({
              name: "myDiscuss",
              userIdList: ["78274"]
            },
            function(ret, err) {
              if (ret) {
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

        },
        step2: function() {

          // RongCloudLibPlugin.getDiscussion({
          //     discussionId: localStorage["discussionId"]
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success', // 状态码：success / error
          //         result: {
          //           creatorId: '55', // 讨论组创建者 Id
          //           id: '1b9f7abe-a5ae-463d-8ff8-d96deaf40b59', //讨论组 Id
          //           name: 'Ironman, Batman', // 讨论组名称
          //           memberIdList: ['1234', '4321'], // 成员 Id 列表
          //           inviteStatus: 'OPENED' // 是否公开好友邀请：OPENED / CLOSED，参见 讨论组邀请状态
          //         }
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("getDiscussion success!");
          //       else {
          //         console.error("getDiscussion error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("getDiscussion error:" + JSON.stringify(err));
          //     }
          //   }
          // );
          //
          // RongCloudLibPlugin.setDiscussionName({
          //     discussionId: localStorage["discussionId"],
          //     name: "test_discussion_name"
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success' // 状态码：success / error
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("setDiscussionName success!");
          //       else {
          //         console.error("setDiscussionName error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("setDiscussionName error:" + JSON.stringify(err));
          //     }
          //   }
          // );
          //
          // RongCloudLibPlugin.addMemberToDiscussion({
          //     discussionId: localStorage["discussionId"],
          //     userIdList: ["orange"]
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success' // 状态码：success / error
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("addMemberToDiscussion success!");
          //       else {
          //         console.error("addMemberToDiscussion error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("addMemberToDiscussion error:" + JSON.stringify(err));
          //     }
          //   }
          // );
          //
          // RongCloudLibPlugin.removeMemberFromDiscussion({
          //     discussionId: localStorage["discussionId"],
          //     userId: "orange"
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success' // 状态码：success / error
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("removeMemberFromDiscussion success!");
          //       else {
          //         console.error("removeMemberFromDiscussion error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("removeMemberFromDiscussion error:" + JSON.stringify(err));
          //     }
          //   }
          // );
          //
          // RongCloudLibPlugin.quitDiscussion({
          //     discussionId: localStorage["discussionId"]
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success' // 状态码：success / error
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("quitDiscussion success!");
          //       else {
          //         console.error("quitDiscussion error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("quitDiscussion error:" + JSON.stringify(err));
          //     }
          //   }
          // );
          //
          // RongCloudLibPlugin.setDiscussionInviteStatus({
          //     discussionId: localStorage["discussionId"],
          //     inviteStatus: "CLOSED"
          //   },
          //   function(ret, err) {
          //     if (ret) {
          //       expectResult = {
          //         status: 'success' // 状态码：success / error
          //       };
          //       if (jsonEqualsStruc(expectResult, ret))
          //         console.info("setDiscussionInviteStatus success!");
          //       else {
          //         console.error("setDiscussionInviteStatus error!");
          //         console.error("expected:" + JSON.stringify(expectResult));
          //         console.error("actural:" + JSON.stringify(ret));
          //       }
          //     }
          //     if (err) {
          //       alert("setDiscussionInviteStatus error:" + JSON.stringify(err));
          //     }
          //   }
          // );

          // RongCloudLibPlugin.deleteMessages({
          //      messageIds: [1, 2]
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("deleteMessages success!");
          //        else {
          //          console.error("deleteMessages error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("deleteMessages error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.clearMessages({
          //      conversationType: "PRIVATE",
          //      targetId: "apple"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("clearMessages success!");
          //        else {
          //          console.error("clearMessages error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("clearMessages error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.getTotalUnreadCount(
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success',
          //          result: 12 // 未读消息数
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("getTotalUnreadCount success!");
          //        else {
          //          console.error("getTotalUnreadCount error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("getTotalUnreadCount error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.getUnreadCount({
          //      conversationType: 'PRIVATE',
          //      targetId: 'apple'
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success',
          //          result: 12 // 未读消息数
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("getUnreadCount success!");
          //        else {
          //          console.error("getUnreadCount error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("getUnreadCount error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
           RongCloudLibPlugin.getUnreadCountByConversationTypes({
               conversationTypes: ['PRIVATE', 'GROUP']
             },
             function(ret, err) {
               if (ret) {
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
          //
          //  RongCloudLibPlugin.setMessageReceivedStatus({
          //      messageId: 1,
          //      receivedStatus: 'READ'
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("setMessageReceivedStatus success!");
          //        else {
          //          console.error("setMessageReceivedStatus error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("setMessageReceivedStatus error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.clearMessagesUnreadStatus({
          //      conversationType: "PRIVATE",
          //      targetId: "apple"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("clearMessagesUnreadStatus success!");
          //        else {
          //          console.error("clearMessagesUnreadStatus error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("clearMessagesUnreadStatus error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.setMessageExtra({
          //      messageId: 1,
          //      value: "test"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("setMessageExtra success!");
          //        else {
          //          console.error("setMessageExtra error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("setMessageExtra error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.getTextMessageDraft({
          //      conversationType: "PRIVATE",
          //      targetId: "apple"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success',
          //          result: 'Hello w' // 草稿的文字内容
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("getTextMessageDraft success!");
          //        else {
          //          console.error("getTextMessageDraft error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("getTextMessageDraft error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.saveTextMessageDraft({
          //      conversationType: "PRIVATE",
          //      targetId: "apple",
          //      content: "test_draft"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("saveTextMessageDraft success!");
          //        else {
          //          console.error("saveTextMessageDraft error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("saveTextMessageDraft error:" + JSON.stringify(err));
          //      }
          //    }
          //  );
          //
          //  RongCloudLibPlugin.clearTextMessageDraft({
          //      conversationType: "PRIVATE",
          //      targetId: "apple"
          //    },
          //    function(ret, err) {
          //      if (ret) {
          //        expectResult = {
          //          status: 'success' // 状态码：success / error
          //        };
          //        if (jsonEqualsStruc(expectResult, ret))
          //          console.info("clearTextMessageDraft success!");
          //        else {
          //          console.error("clearTextMessageDraft error!");
          //          console.error("expected:" + JSON.stringify(expectResult));
          //          console.error("actural:" + JSON.stringify(ret));
          //        }
          //      }
          //      if (err) {
          //        alert("clearTextMessageDraft error:" + JSON.stringify(err));
          //      }
          //    }
          //  );

           RongCloudLibPlugin.setMessageSentStatus({
               messageId: 1,
               sentStatus: 'READ'
             },
             function(ret, err) {
               if (ret) {
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

           RongCloudLibPlugin.sendTextMessage({
                         conversationType: "PRIVATE",
                         targetId: "apple",
                         text: "hello world from testController",
                         extra: "this is a extra text"
                       },
                       function(ret, err) {
                         if (ret) {
                           if (ret.status == 'prepare') {
                             //ios此处返回值比文档多了字段recievedStatus 可以忽略
                             expectResult = {
                               status: 'prepare', // 状态码：prepare / success / error
                               result: {
                                 message: {
                                   content: {
                                     text: 'Hello world!',
                                     extra: ''
                                   }, // 消息内容
                                   extra: '',
                                   conversationType: 'PRIVATE', // 参见 会话类型 枚举
                                   messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                                   targetId: '16', // 接收者 Id
                                   objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                                   sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                                   senderUserId: '55', // 发送者 userId
                                   messageId: 608, // 本地消息 Id
                                   sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                                   receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                                 }
                               }
                             };
                             if (jsonEqualsStruc(expectResult, ret))
                               console.info("sendTextMessage prepare success!");
                             else {
                               console.error("sendTextMessage prepare error!");
                               console.error("expected:" + JSON.stringify(expectResult));
                               console.error("actural:" + JSON.stringify(ret));
                             }
                           } else {
                             expectResult = {
                               status: 'success', // 状态码：prepare / success / error
                               result: {
                                 message: {
                                   messageId: 608 // 本地消息 Id
                                 }
                               }
                             };
                             if (jsonEqualsStruc(expectResult, ret))
                               console.info("sendTextMessage success!");
                             else {
                               console.error("sendTextMessage error!");
                               console.error("expected:" + JSON.stringify(expectResult));
                               console.error("actural:" + JSON.stringify(ret));
                             }
                           }
                         }
                         if (err) {
                           alert("sendTextMessage error:" + JSON.stringify(err));
                         }

                       }

                     );

           RongCloudLibPlugin.clearConversations({
                         conversationTypes: ['PRIVATE', 'GROUP']
                       },
                       function(ret, err) {
                         if (ret) {
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

        },
        step3: function() {
          RongCloudLibPlugin.logout(
            function(ret, err) {
              if (ret) {
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
        },
        sendMsg: function() {
          RongCloudLibPlugin.sendTextMessage({
              conversationType: "PRIVATE",
              targetId: "apple",
              text: "hello world from testController",
              extra: "this is a extra text"
            },
            function(ret, err) {
              if (ret) {
                if (ret.status == 'prepare') {
                  //ios此处返回值比文档多了字段recievedStatus 可以忽略
                  expectResult = {
                    status: 'prepare', // 状态码：prepare / success / error
                    result: {
                      message: {
                        content: {
                          text: 'Hello world!',
                          extra: ''
                        }, // 消息内容
                        extra: '',
                        conversationType: 'PRIVATE', // 参见 会话类型 枚举
                        messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                        targetId: '16', // 接收者 Id
                        objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                        sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                        senderUserId: '55', // 发送者 userId
                        messageId: 608, // 本地消息 Id
                        sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                        receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendTextMessage prepare success!");
                  else {
                    console.error("sendTextMessage prepare error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                } else {
                  expectResult = {
                    status: 'success', // 状态码：prepare / success / error
                    result: {
                      message: {
                        messageId: 608 // 本地消息 Id
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendTextMessage success!");
                  else {
                    console.error("sendTextMessage error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                }
              }
              if (err) {
                alert("sendTextMessage error:" + JSON.stringify(err));
              }

            }

          );

          RongCloudLibPlugin.sendImageMessage({
              conversationType: "PRIVATE",
              targetId: "apple",
              imagePath: "/var/mobile/Applications/0369D904-6019-4C05-B619-2F697A3BA543/Documents/9119/Cache/private/9119/image/image_jpeg_RC-0115-02-25_673_1427250734",
              extra: "this is a extra text"
            },
            function(ret, err) {
              if (ret) {
                if (ret.status == 'prepare') {
                  //ios此处返回值比文档多了字段recievedStatus 可以忽略
                  expectResult = {
                    status: 'prepare', // 状态码：prepare / progress / success / error
                    result: {
                      message: {
                        content: {
                          imagePath: '/xxx/xxx/image.jpg',
                          thumbPath: '/xxx/xxx/thumb.jpg',
                          extra: ''
                        }, // 消息内容
                        conversationType: 'PRIVATE', // 参见 会话类型 枚举
                        messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                        targetId: 'apple', // 接收者 Id
                        objectName: 'RC:ImgMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                        sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                        senderUserId: '55', // 发送者 userId
                        messageId: 608, // 本地消息 Id
                        sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                        receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendImageMessage prepare success!");
                  else {
                    console.error("sendImageMessage prepare error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                } else {
                  expectResult = {
                    status: 'success', // 状态码：prepare / success / error
                    result: {
                      message: {
                        messageId: 608 // 本地消息 Id
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendImageMessage success!");
                  else {
                    console.error("sendImageMessage error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                }
              }
              if (err) {
                alert("sendImageMessage error:" + JSON.stringify(err));
              }
            }
          );

          RongCloudLibPlugin.sendRichContentMessage({
              conversationType: 'PRIVATE',
              targetId: 'apple',
              title: "rongCloud", // 消息的标题.
              description: '融云SDK APICloud 版', // 消息的简介.
              imageUrl: 'http://abfc6f80482f86f9ccf4.b0.upaiyun.com/apicloud/5b67af4da9ce31f101c3326fbef10e5e.png', // 消息图片的网络地址.
              extra: 'From APICloud' // 消息的附加信息.
            },
            function(ret, err) {
              if (ret) {
                if (ret.status == 'prepare') {
                  //ios此处返回值比文档多了字段recievedStatus 可以忽略
                  expectResult = {
                    status: 'prepare', // 状态码：prepare / success / error
                    result: {
                      message: {
                        content: {
                          title: 'Big News',
                          description: 'I am Ironman.',
                          imageUrl: 'http://p1.cdn.com/fds78ruhi.jpg',
                          extra: '',
                          url: ''
                        }, // 消息内容
                        conversationType: 'PRIVATE', // 参见 会话类型 枚举
                        messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                        targetId: '16', // 接收者 Id
                        objectName: 'RC:ImgTextMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                        sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                        senderUserId: '55', // 发送者 userId
                        messageId: 608, // 本地消息 Id
                        sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                        receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendRichContentMessage prepare success!");
                  else {
                    console.error("sendRichContentMessage prepare error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                } else {
                  expectResult = {
                    status: 'success', // 状态码：prepare / success / error
                    result: {
                      message: {
                        messageId: 608 // 本地消息 Id
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendRichContentMessage success!");
                  else {
                    console.error("sendRichContentMessage error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                }
              }
              if (err) {
                alert("sendRichContentMessage error:" + JSON.stringify(err));
              }

            }
          );

          RongCloudLibPlugin.sendLocationMessage({
              conversationType: "PRIVATE",
              targetId: "apple",
              latitude: 39.8802147,
              longitude: 116.415794,
              poi: "location_poi_info",
              imagePath: "http://rongcloud.cn/images/logo.png",
              extra: "this is a extra text"
            },
            function(ret, err) {
              if (ret) {
                if (ret.status == 'prepare') {
                  //ios此处返回值比文档多了字段recievedStatus 可以忽略
                  expectResult = {
                    status: 'prepare', // 状态码：prepare / progress / success / error
                    result: {
                      message: {
                        content: {
                          latitude: 39.9139,
                          longitude: 116.3917,
                          poi: '北京市朝阳区北苑路北辰泰岳大厦',
                          imagePath: '/xxx/xxx/location.jpg',
                          extra: ''
                        }, // 消息内容
                        conversationType: 'PRIVATE', // 参见 会话类型 枚举
                        messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                        targetId: 'apple', // 接收者 Id
                        objectName: 'RC:LBSMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                        sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                        senderUserId: '55', // 发送者 userId
                        messageId: 608, // 本地消息 Id
                        sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                        receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendLocationMessage prepare success!");
                  else {
                    console.error("sendLocationMessage prepare error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                } else {
                  expectResult = {
                    status: 'success', // 状态码：prepare / success / error
                    result: {
                      message: {
                        messageId: 608 // 本地消息 Id
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendLocationMessage success!");
                  else {
                    console.error("sendLocationMessage error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                }
              }
              if (err) {
                alert("sendLocationMessage error:" + JSON.stringify(err));
              }
            }
          );

          RongCloudLibPlugin.sendCommandNotificationMessage({
              conversationType: "PRIVATE",
              targetId: "apple",
              name: "commont_name",
              data: "commont_data"
            },
            function(ret, err) {
              if (ret) {
                if (ret.status == 'prepare') {
                  //ios此处返回值比文档多了字段recievedStatus 可以忽略
                  expectResult = {
                    status: 'prepare', // 状态码：prepare / success / error
                    result: {
                      message: {
                        content: {
                          name: 'AddFriend',
                          data: '{\"inviteUserId\":123}'
                        }, // 消息内容
                        conversationType: 'PRIVATE', // 参见 会话类型 枚举
                        messageDirection: 'SEND', // 消息方向：SEND 或者 RECEIVE
                        targetId: '16', // 接收者 Id
                        objectName: 'RC:TxtMsg', // 消息类型，参见 http://docs.rongcloud.cn/android_message.html#_内置内容类消息
                        sentStatus: 'SENDING', // 发送状态：SENDING, SENT 或 FAILED
                        senderUserId: '55', // 发送者 userId
                        messageId: 608, // 本地消息 Id
                        sentTime: 1418971531533, // 发送消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                        receivedTime: 0 // 收到消息的时间戳，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始到现在的毫秒数
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendCommandNotificationMessage prepare success!");
                  else {
                    console.error("sendCommandNotificationMessage prepare error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                } else {
                  expectResult = {
                    status: 'success', // 状态码：prepare / success / error
                    result: {
                      message: {
                        messageId: 608 // 本地消息 Id
                      }
                    }
                  };
                  if (jsonEqualsStruc(expectResult, ret))
                    console.info("sendCommandNotificationMessage success!");
                  else {
                    console.error("sendCommandNotificationMessage error!");
                    console.error("expected:" + JSON.stringify(expectResult));
                    console.error("actural:" + JSON.stringify(ret));
                  }
                }
              }
              if (err) {
                alert("sendCommandNotificationMessage error:" + JSON.stringify(err));
              }

            }

          );

        }
    };

    testApp.step2();




  });
