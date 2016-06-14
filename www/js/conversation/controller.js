angular.module('cordovaim.conversation.controller', [])
.controller('conversationCtrl', function($scope, Friends, Groups, Chatroom, CustomerService, Discussion, newMessageEventService) {

  var newMsgCallBack = function(d,data){
    console.log('conversation newMessage' + data);
    jsonMsg = JSON.parse(data);
    jsonMsg.unreadMessageCount = "1";
    var target;
    if(jsonMsg.conversationType == "PRIVATE"){
        target = Friends.get(jsonMsg.targetId);
    }
    else if(jsonMsg.conversationType == "GROUP"){
        target = Groups.get(jsonMsg.targetId);
    }

    console.log('target:' + JSON.stringify(target));
    jsonMsg = myUtil.resolveCon(jsonMsg, 1, target);
    console.log('jsonMsg after resolveCon:' + JSON.stringify(jsonMsg));
    //jsonMsg.sendTime = new Date(jsonMsg.sendTime).toString().split(" ")[4];
    //console.log("FriendsCtrl received new message " + (jsonMsg.details.content));
    $targetId = $("#" + jsonMsg.targetId);

    //当前会话列表已有的会话，只改变消息内容和时间
    if ($targetId.length > 0) {
      var index = findInFriends(jsonMsg.targetId);
      if (index > -1) {
        // var $unreadcount = $targetId.find('.unreadcount');
        if($scope.friends[index].conversationType == 'CHATROOM' || $scope.friends[index].conversationType == 'CUSTOMER_SERVICE')
           return;
        var unreadMessageCount = parseInt($scope.friends[index].unreadMessageCount);
        unreadMessageCount++;
        $scope.friends[index].unreadMessageCount = unreadMessageCount;
        $scope.friends[index].latestMessage = jsonMsg.latestMessage;
        // $unreadcount.html.removeClass('ng-hide');
      }
    } else {
      // if(jsonMsg.conversationType == "PRIVATE"){
      //     target = Friends.get(result[i].targetId);
      //     jsonMsg.conversationTitle = target.username;
      //     jsonMsg.portrait = target.portrait;
      // }
      // else if(result[i].conversationType == "GROUP"){
      //       target = Groups.get(result[i].targetId);
      //       jsonMsg.conversationTitle = target.name;
      //       jsonMsg.portrait = target.portrait;
      // }
      $scope.friends.push(jsonMsg);
    }
  }
  newMessageEventService.listen(newMsgCallBack);

  $scope.clearConversition = function() {
    RongCloudLibPlugin.clearConversations({
        conversationTypes: ["PRIVATE", "DISCUSSION"]
      },
      function(ret, err) {
        if (ret) {
          alert("clearConversition success: " + result.status);
          $scope.$apply(function() {
            $scope.friends = [];
          });
        }
        if (err) {
          alert('clearConversition err:' + JSON.stringify(err));
        }
      }

    );
  }

  var findInFriends = function(val) {
    for (var i = 0; i < $scope.friends.length; i++) {
      if ($scope.friends[i].targetId == val) {
        return i;
        break
      }
    }
    return -1;
  }

  var getConversationList = function() {
    RongCloudLibPlugin.getConversationList(
      function(ret, err) {
        if (ret) {
          console.log('getConversationList:' + JSON.stringify(ret));
          var result = ret.result;
          var target, discussionIndex = -1;
          for (var i = 0; i < result.length; i++) {
            if(result[i].conversationType == 'DISCUSSION' && result[i].targetId == Discussion.all()[0].targetId){
              discussionIndex = i;
            }
            if(result[i].conversationType == "PRIVATE"){
                target = Friends.get(result[i].targetId);
            }
            else if(result[i].conversationType == "GROUP"){
                target = Groups.get(result[i].targetId);
            }
            console.log('target:' + JSON.stringify(target));
            result[i] = myUtil.resolveCon(result[i], 0, target);
            //alert('conversationTitle:'+result[i].conversationTitle);
          }
          if(discussionIndex > -1){
             result[discussionIndex].conversationTitle = Discussion.all()[0].conversationTitle;
          }else{
             result.unshift(Discussion.all()[0]);
          }

          result.unshift(Chatroom.all()[0]);
          result.unshift(CustomerService.all()[0]);
          $scope.$apply(function() {
            $scope.friends = result;
          });
        }
        if (err) {
          alert('getConversationList err:' + JSON.stringify(err));
        }

      }
    );

  }

  var init = function(){
    $scope.friends = [];
    getConversationList();
  }
  init();

});
