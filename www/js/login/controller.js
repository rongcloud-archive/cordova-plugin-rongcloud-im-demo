angular.module('cordovaim.login.controller', [])
  .controller('LoginCtrl', function($scope, Friends, $rootScope, $state, $ionicHistory, serverService) {

    $scope.data = {
      username: "",
      password: ""
    };
    //  if (window.RongCloudLibPlugin) {
    // com.rongCloud.lib required

    var initRong = function(token) {
      $rootScope.arrMsgs = new Array();
      $rootScope.arrCons = new Array();
      RongCloudLibPlugin.init({
          // appKey: "lmxuhwagx8tyd",
          // appKey: "z3v5yqkbv8v30",
          appKey: _appKey
          // deviceToken: "87jjfds8393sfjds83"
        },
        function(ret, err) {
          if (ret) {
            console.log('init:' + JSON.stringify(ret));
          }
          if (err) {
            console.log('init error:' + JSON.stringify(err));
          }
        }

      );

      RongCloudLibPlugin.setConnectionStatusListener(
        function(ret, err) {
          if (ret) {
            console.log('setConnectionStatusListener:' + JSON.stringify(ret));
             if(ret.result.connectionStatus == 'KICKED'){
                 alert('您的帐号已在其他端登录!');
                 $rootScope.hideTabs = false;
                 $ionicHistory.clearCache();
                 $state.go('login');
             }
          }
          if (err) {
            console.log('setConnectionStatusListener error:' + JSON.stringify(err));
          }
        }
      );

      RongCloudLibPlugin.connect({
          token: token
        },
        function(ret, err) {
          if (ret) {
            console.log('connect:' + JSON.stringify(ret));
            $rootScope.curUID = ret.result.userId;
            $rootScope.$apply();
            myUtil.setUserId(ret.result.userId);
            $state.go('tab.friends', {
              userId: ret.result.userId
            }, {
              reload: true
            });
          }
          if (err) {
            console.log('init error:' + JSON.stringify(err));
          }
        }
      );

      RongCloudLibPlugin.setOnReceiveMessageListener(
        function(ret, err) {
          if (ret) {
            console.log('setOnReceiveMessageListener:' + JSON.stringify(ret));
            // alert('setOnReceiveMessageListener:' + JSON.stringify(ret));
            $rootScope.arrMsgs.push(JSON.stringify(ret.result.message));
            $rootScope.$apply();
          }
          if (err) {
            console.log('setOnReceiveMessageListener error:' + JSON.stringify(err));
          }
        }

      );
    }

    //  }

    $scope.login = function() {
      var uid = $scope.data.username;
      var pwd = $scope.data.password;
      var user = Friends.get(uid);
      var data = {email: uid, password: pwd};
      serverService.login(data).then(function(ret, err){
        if(ret){
            // "data":{"code":200,"result":{"id":"78274","username":"Eva","portrait":"http://www.gravatar.com/avatar/629497a2072fbfdbde466141b2888c42?s=82&d=wavatar","token":"9a++ytEwunqmxV0RBXNqn82yq+hfEluLjZ78E1qo4hHrwCrWRcote1512+sMJnu/ofBIBi6KLRnPk4Q6Ktm9Lg=="}},"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"url":"http://webim.demo.rong.io/email_login_token","data":"email=zhengyi@rongcloud.cn&password=zyrongcloud","headers":{"Content-Type":"application/x-www-form-urlencoded","Accept":"application/json, text/plain, */*"}},"statu
            console.log("login data:" + JSON.stringify(ret));
            if(ret.data.code == "200"){
                $rootScope.user = ret.data.result;
                initRong($rootScope.user.token);
            }
            else{
              alert("email or password is error");
            }
        }
        if(err){
           console.log("login err:" + JSON.stringify(err));
        }
      });
      // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
      // // alert(JSON.stringify(user));
      // console.log('Friends:'+JSON.stringify(Friends.all()));
      // if (user) {
      //   $scope.data.username = "";
      //   initRong(user.token);
      // } else {
      //   console.error('user not exists!');
      //   alert('user not exists!');
      // }
    }
    $scope.exit = function() {
      window.close();
      ionic.Platform.exitApp();
    }

  });
