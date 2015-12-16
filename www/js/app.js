// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cordovaim', ['ionic', 'cordovaim.login.controller', 'cordovaim.controllers', 'cordovaim.conversation.controller', 'cordovaim.frienddetail.controller', 'cordovaim.test.controller', 'cordovaim.testdetail.controller', 'cordovaim.services', 'ngCordova', 'ngIOS9UIWebViewPatch' ])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('tab', {
      url: '/tab',
      abstract: true,
      cache: false,
      templateUrl: 'templates/tabs.html',
      controller: 'AppCtrl'
    })

    .state('tab.browse', {
        url: '/browse',
        views: {
          'tab-account': {
            templateUrl: 'templates/browse.html',
            controller: 'TestCtrl'
              //controller: 'BrowseCtrl'
          }
        }
      })

    .state('tab.friends', {
        url: '/friends',
        views: {
          'tab-friends': {
            templateUrl: 'templates/tab-friends.html',
            controller: 'FriendsCtrl'
          }
        }
      })

      .state('tab.friendInfo', {
        url: '/friendInfo/:targetId/:conversationType',
        views: {
          'tab-friends': {
            templateUrl: 'templates/tab-friendinfo.html',
            controller: 'friendInfoCtrl'
          }
        }
      })

      .state('tab.groupInfo', {
        url: '/groupInfo/:targetId/:conversationType',
        views: {
          'tab-friends': {
            templateUrl: 'templates/tab-groupinfo.html',
            controller: 'groupInfoCtrl'
          }
        }
      })

      .state('tab.friend-chat', {
        url: '/friend2/:targetId/:conversationType',
        views: {
          'tab-friends': {
            templateUrl: 'templates/friend-detail.html',
            controller: 'friendDetailCtrl'
          }
        }
      })

      .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'conversationCtrl'
            }
          }
        })

      .state('tab.friend-detail', {
        url: '/friend/:targetId/:conversationType',
        views: {
          'tab-chats': {
            templateUrl: 'templates/friend-detail.html',
            controller: 'friendDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.blacklist', {
        url: '/blacklist',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-blacklist.html',
            controller: 'blacklistCtrl'
          }
        }
      })

      .state('tab.testdetail', {
        url: '/testdetail',
        views: {
          'tab-account': {
            templateUrl: 'templates/testdetail.html',
            controller: 'TestDetailCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  })
  .filter('trustHtml', function($sce) {

    return function(input) {

      return $sce.trustAsHtml(input);

    }

  });
