angular.module('cordovaim.controllers', [])
  .controller('AppCtrl', function($scope, $state, $cordovaMedia, $cordovaFile, Friends, Groups, $cordovaCapture, $rootScope, newMessageEventService) {

    var chMsg = function(newValue, oldValue) {
      if (newValue !== oldValue) {
        var jsonMsg = newValue.pop();
        if (typeof jsonMsg !== "undefined" && jsonMsg !== "undefined") {
          console.log('begin broadcast');
          // $rootScope.$broadcast('newMessage', jsonMsg);
          newMessageEventService.broadcast(jsonMsg);
        }
      }
    };
    var listener = $rootScope.$watch('arrMsgs', chMsg, true); //只用watch着items的变化
    $scope.$on('$destroy', function() {
      //stop watching when scope is destroyed
      listener();
    });

    $scope.curUID = $rootScope.curUID ? $rootScope.curUID : "";

    $scope.$on('$destroy', function() {
      //stop watching when scope is destroyed
      console.log('destroy');
      listener();
    });


    $scope.captureAudio = function() {
    //   var options = {
    //     limit: 1,
    //     duration: 10
    //   };
    //
    //   $cordovaCapture.captureAudio(options).then(function(mediaFiles) {
    //     // Success! Audio data is here
    //     var i, path, len;
    //     for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    //       path = mediaFiles[i].fullPath;
    //       alert(path);
    //       // do something interesting with the file
    //     }
    //   }, function(err) {
    //     // An error occurred. Show a message to the user
    //   });

    var voiFile = '/data/data/com.ionicframework.cordovaandroid751564/files/apple/voice/29.amr';
    voiFile =     '/Users/zy/Library/Developer/CoreSimulator/Devices/C9273CC2-643D-4E2B-9860-BFD17CAAD20B/data/Containers/Data/Application/6E5806CE-8D08-4BB8-87E8-B8DC70993F1A/Documents/02e4aeae093b74d629075cafcf323e55bc9ed';
    var mediaRec = new Media(voiFile,
      // 成功操作
      function() {
        console.log("play():Audio Success");
      },
      // 失败操作
      function(err) {
        console.log("play():Audio Error: " + err.code);
      }
    );
    //开始播放录音
    mediaRec.play();
    }



  })
.controller('FriendsCtrl', function($scope, Friends, $state, Groups, $rootScope, serverService) {
  // var arrF = Friends.all().slice(0);
  // var curUser = Friends.get($rootScope.curUID);
  // arrF.splice($.inArray(curUser,arrF),1);
  // $scope.friends = arrF;
  // $scope.groups = Groups.all();
  serverService.getFriend().then(function(ret, err){
    if(ret){
      console.log("getFriend:" + JSON.stringify(ret));
      $scope.friends = ret.data.result;
      Friends.set(ret.data.result);
    }
    if(err){
      console.log("getFriend err:" + JSON.stringify(err));
    }
  });
  serverService.getMyGroups().then(function(ret, err){
    if(ret){
      console.log("getMyGroups:" + JSON.stringify(ret));
      $scope.groups = ret.data.result;
      Groups.set(ret.data.result);

    }
    if(err){
      console.log("getMyGroups err:" + JSON.stringify(err));
    }
  });
  $scope.logout = function() {
    RongCloudLibPlugin.logout(
      function(ret, err) {
        if (ret) {
          console.log('logout:' + JSON.stringify(ret));
          $state.go('login');
        }
        if (err) {
          console.log('logout error:' + JSON.stringify(err));
          alert('logout error:' + JSON.stringify(err));
        }
      }
    );
  };

})

.controller('friendInfoCtrl', function($scope, Friends, Blacklist, $state, $stateParams) {
     $scope.Target = Friends.get($stateParams.targetId);
     $scope.settings = {
       inBlackList: false
     };
     var lists = Blacklist.all();
     if(!lists.length){
       RongCloudLibPlugin.getBlacklist(
         function(ret, err) {
           if (ret) {
             console.log('getBlacklist:' + JSON.stringify(ret));
             var userinfo;

             for(var i=0;i<ret.result.length;i++){
               userinfo = Friends.get(ret.result[i]);
               lists.push({id:ret.result[i], username: userinfo.username, portrait:userinfo.portrait});
             }
             Blacklist.set(lists);
             console.log('Blacklist:' + JSON.stringify(Blacklist.all()));
             console.log($stateParams.targetId);
             console.log(JSON.stringify(Blacklist.get($stateParams.targetId)));
             if(Blacklist.get($stateParams.targetId))
               $scope.settings.inBlackList = true;

           }
           if (err) {
             console.log('logout error:' + JSON.stringify(err));
             alert('logout error:' + JSON.stringify(err));
           }
         }
       );
     }
     else{
       console.log('Blacklist:' + JSON.stringify(Blacklist.all()));
       console.log($stateParams.targetId);
       console.log(JSON.stringify(Blacklist.get($stateParams.targetId)));
       if(Blacklist.get($stateParams.targetId))
         $scope.settings.inBlackList = true;
     }


     $scope.sendMsg = function() {
        $state.go('tab.friend-chat', {targetId:$stateParams.targetId, conversationType:$stateParams.conversationType});
     }
     $scope.chBlackList = function() {
       if($scope.settings.inBlackList){
         RongCloudLibPlugin.addToBlacklist({userId: $stateParams.targetId},
           function(ret, err) {
             if (ret) {
               console.log('addToBlacklist:' + JSON.stringify(ret));
               var userinfo = Friends.get($stateParams.targetId);
               Blacklist.addOne({id:$stateParams.targetId, username: userinfo.username, portrait:userinfo.portrait});
               alert('加入黑名单成功!');

             }
             if (err) {
               console.log('addToBlacklist error:' + JSON.stringify(err));
               alert('addToBlacklist error:' + JSON.stringify(err));
             }
           }
         );

       }
       else{
         RongCloudLibPlugin.removeFromBlacklist({userId: $stateParams.targetId},
           function(ret, err) {
             if (ret) {
               console.log('removeFromBlacklist:' + JSON.stringify(ret));
               Blacklist.removeOne($stateParams.targetId);
               alert('移出黑名单成功!');
             }
             if (err) {
               console.log('removeFromBlacklist error:' + JSON.stringify(err));
               alert('removeFromBlacklist error:' + JSON.stringify(err));
             }
           }
         );

       }
     }
})

.controller('groupInfoCtrl', function($scope, Groups, $state, $stateParams, serverApiService) {
     $scope.Target = Groups.get($stateParams.targetId);
     $scope.sendMsg = function() {
        $state.go('tab.friend-chat', {targetId:$stateParams.targetId, conversationType:$stateParams.conversationType});
     }
     //查询群组成员
     function getGroupMem() {
       console.log("getGroupMem....");
       serverApiService.getGroupMem({groupId: $stateParams.targetId, url: 'group/user/query.json'}).then(function(ret){
           console.log(JSON.stringify(ret));
           $scope.memberNum = ret.data.users.length;
           $scope.members = ret.data.users;
       });
    }

    // getGroupMem();
})

.controller('AccountCtrl', function($scope, $cordovaFileTransfer, Friends, $rootScope, $state, $window, $ionicHistory) {
  $scope.settings = {
    enableFriends: true
  };
  console.log('$rootScope.curUID:'+$rootScope.curUID);
  // $scope.User = Friends.get($rootScope.curUID);
  $scope.User = $rootScope.user;
  $scope.goBlacklist = function() {
      $state.go('tab.blacklist');
  }

  $scope.logout = function() {
    RongCloudLibPlugin.disconnect({isReceivePush: true},
      function(ret, err) {
        if (ret) {
          console.log('disconnect:' + JSON.stringify(ret));
          $ionicHistory.clearCache();
          $state.go('login');
          // $scope.$emit('$destroy');
          // $window.location.reload(true);
        }
        if (err) {
          console.log('disconnect error:' + JSON.stringify(err));
          alert('disconnect error:' + JSON.stringify(err));
        }
      }
    );
  }
  $scope.goTest = function() {
    $state.go('tab.testdetail');
  }

  var url = "http://api.map.baidu.com/staticimage?center=116.378948,39.917527&width=280&height=168&zoom=18";
  url = 'http://7i7gc6.com1.z0.glb.clouddn.com/testVoice.amr';
  var targetPath = cordova.file.applicationDirectory + "loc_xidan2.png";
  targetPath = cordova.file.applicationDirectory + "testVoice.amr";
  var trustHosts = true
  var options = {};
  $scope.downloadImage = function() {
    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
        console.log('targetPath:'+targetPath);
        console.log('result:'+ JSON.stringify(result));

      }, function(err) {
        // Error
        console.log('downloadImage err' + JSON.stringify(err));
      }, function (progress) {
        // $timeout(function () {
        //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        // })
      });
  }
})

.controller('blacklistCtrl', function($scope, Friends, Blacklist) {
    var lists = Blacklist.all();
    var userinfo;
    if(!lists.length){
      RongCloudLibPlugin.getBlacklist(
        function(ret, err) {
          if (ret) {
            console.log('blacklistCtrl getBlacklist:' + JSON.stringify(ret));


            for(var i=0;i<ret.result.length;i++){
              userinfo = Friends.get(ret.result[i]);
              lists.push({id:ret.result[i], username: userinfo.username, portrait:userinfo.portrait});
            }
            Blacklist.set(lists);
            $scope.blacklist = Blacklist.all();
          }
          if (err) {
            console.log('logout error:' + JSON.stringify(err));
            alert('logout error:' + JSON.stringify(err));
          }
        }
      );
    }
    else{
      $scope.blacklist = lists;
    }


     $scope.rmFromBlacklist = function(id) {
       RongCloudLibPlugin.removeFromBlacklist({userId: id},
         function(ret, err) {
           if (ret) {
             console.log('removeFromBlacklist:' + JSON.stringify(ret));
             $scope.blacklist.splice($.inArray(id,$scope.blacklist),1);
             $scope.$apply();
             Blacklist.removeOne(id);
             alert('移出黑名单成功!');

           }
           if (err) {
             console.log('removeFromBlacklist error:' + JSON.stringify(err));
             alert('removeFromBlacklist error:' + JSON.stringify(err));
           }
         }
       );
     }
});
