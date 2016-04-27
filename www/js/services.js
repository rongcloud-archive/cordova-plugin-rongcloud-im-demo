angular.module('cordovaim.services', [])

/**
 * A simple example service that returns some data.
 */
 .factory('Discussion', function() {
   var discussion = [
     { targetId: '2895e3c5-2cdc-46fb-ac4a-073bc11cffdd', conversationType: 'DISCUSSION', conversationTitle: '讨论组myDiscuss', unreadMessageCount: 0, latestMessage: '' }
   ];

   return {
     all: function() {
       return discussion;
     },
     set: function(val) {
       discussion = val;
     },
     get: function(roomId) {
       // Simple index lookup
       var retIndex = -1;
       for(var i=0;i<discussion.length;i++){
          if(rooms[i].id == roomId){
             retIndex = i;
             break;
          }
       }
       return retIndex > -1 ? discussion[retIndex] : null;
     }
   }
 })
 .factory('Chatroom', function() {
   var rooms = [
     { targetId: 'Sunny', conversationType: 'CHATROOM', conversationTitle: '聊天室Sunny', unreadMessageCount: 0, latestMessage: '' }
   ];

   return {
     all: function() {
       return rooms;
     },
     set: function(val) {
       rooms = val;
     },
     get: function(roomId) {
       // Simple index lookup
       var retIndex = -1;
       for(var i=0;i<rooms.length;i++){
          if(rooms[i].id == roomId){
             retIndex = i;
             break;
          }
       }
       return retIndex > -1 ? rooms[retIndex] : null;
     }
   }
 })
 .factory('CustomerService', function() {
   var customes = [
     { targetId: 'kefu114', conversationType: 'CUSTOMER_SERVICE', conversationTitle: '客服', unreadMessageCount: 0, latestMessage: '' }
   ];

   return {
     all: function() {
       return customes;
     },
     set: function(val) {
       customes = val;
     },
     get: function(groupId) {
       // Simple index lookup
       var retIndex = -1;
       for(var i=0;i<customes.length;i++){
          if(customes[i].id == groupId){
             retIndex = i;
             break;
          }
       }
       return retIndex > -1 ? customes[retIndex] : null;
     }
   }
 })
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    // { id: 'aaa5936', name: 'aaa5936', conversationType: 'PRIVATE', token: 'D2aiwIsFqQZcOVOfo58U115ReSzR6ZozkbNAw1/H/RsaAK5ujc/323A5gExH7RdfsmOkEV3tL3DMpbwNLzT4vg==', img: 'img/personPhoto.png' },
    // { id: 'apple', name: 'apple', conversationType: 'PRIVATE', token: 'TjAbmhGhGXRuepTtqDAfCtWgY1boRpOYK6FgU1IoeZf//1OMUHmvxoWLBTvyf63B6DZUxfXIvcsVoh1qaI5grQ==' , img: 'img/personPhoto.png'},
    // { id: 'aaa8925', name: 'aaa8925', conversationType: 'PRIVATE', token: 'GaaCAcWE4XN1LJOwFTPOPwKMJXK9QJjrT0jg7bQVbyFkWAjOhd98ps9vTQMvjzrzFuflJZpUpRpCaa7Eq+teCQ==' , img: 'img/personPhoto.png'},
    // { id: 'aaa1581', name: 'aaa1581', conversationType: 'PRIVATE', token: 'k2hdO+214I5jKbRj7eTjnx8GDmKKI/aTcJAT/FHkp9xb9+ZzBkGe1lSwO1nIcB62UmLXQSc7q8wtnAehGKocLz+Vdb6L9JzF' , img: 'img/personPhoto.png'},
    // { id: 'aaa6119', name: 'aaa6119', conversationType: 'PRIVATE', token: 'ZLXoL+yj3+MvCx6QgJ+8LNWgY1boRpOYK6FgU1IoeZfLYL+xR80FBwDBLSl+0AWYI7yH1+g1x7AXRv3mNvMhL0GTbjiTik0x' , img: 'img/personPhoto.png'}
  ];

  return {
    all: function() {
      return friends;
    },
    set: function(val) {
      friends = val;
    },
    get: function(friendId) {
      // Simple index lookup
      var retIndex = -1;
      for(var i=0;i<friends.length;i++){
         if(friends[i].id == friendId){
            retIndex = i;
            break;
         }
      }
      return retIndex > -1 ? friends[retIndex] : null;
    }
  }
})
.factory('Groups', function() {
  var groups = [
    { id: 'group1', name: 'group1', conversationType: 'GROUP', img: 'img/personPhoto.png' },
    { id: 'grp6', name: 'grp6', conversationType: 'GROUP', img: 'img/personPhoto.png'}
  ];

  return {
    all: function() {
      return groups;
    },
    set: function(val) {
      groups = val;
    },
    get: function(groupId) {
      // Simple index lookup
      var retIndex = -1;
      for(var i=0;i<groups.length;i++){
         if(groups[i].id == groupId){
            retIndex = i;
            break;
         }
      }
      return retIndex > -1 ? groups[retIndex] : null;
    }
  }
})
.factory('Blacklist', function() {
  var lists = [
    // { id: 'group1', username: 'group1', portrait: 'img/personPhoto.png' },
    // { id: 'grp6', username: 'grp6', portrait: 'img/personPhoto.png'}
  ];
  return {
    all: function() {
      return lists;
    },
    set: function(val) {
      lists = val;
    },
    addOne: function(val) {
      lists.push(val);
    },
    removeOne: function(val) {
      for(var i=0;i<lists.length;i++){
         if(lists[i].id == val){
            lists.splice(i, 1);
            break;
         }
      }
    },
    get: function(id) {
      // Simple index lookup
      var retIndex = -1;
      for(var i=0;i<lists.length;i++){
         if(lists[i].id == id){
            retIndex = i;
            break;
         }
      }
      return retIndex > -1 ? lists[retIndex] : null;
    }
  }
})
.service("newMessageEventService",function($rootScope) {
   var msgService = {
      broadcast: function(data) {$rootScope.$broadcast("newMsg", data)},
      listen: function(callback) {$rootScope.$on("newMsg",callback)}
   };
   return msgService;
})
.service("serverApiService",function($http) {
  //  var appKey = "";
   var appSecret = "";
   var nonce = Math.floor(Math.random() * 1000000);
   var timestamp = Date.now();
   var signature = SHA1("" + appSecret + nonce + timestamp);
  //  var url = "https://api.cn.rong.io/";
  var url = "http://webim.demo.rong.io/";
   var headers = {
      "RC-App-Key": _appKey,
      "RC-Nonce": "" + nonce,
      "RC-Timestamp": "" + timestamp,
      "RC-Signature": "" + signature,
      "Content-Type": "application/x-www-form-urlencoded"
   };
   var serverService = {
      getGroupMem: function(data) {
        var req = {
                 method: "POST",
                 url: url + data.url,
                 data: 'groupId=' + data.groupId,
                 headers: headers
             };
        return $http(req);
      },
      getToken: function(callback) {}
   };
   return serverService;
})
.service("serverService",function($http) {
   var FAKE_Sever = "http://webim.demo.rong.io/";
  //  var headers = {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //  };

   var headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
   var serverService = {
      login: function(data) {  //data{email:,password:,env}
      console.log(data.email);
        var req = {
                 method: "POST",
                 url: FAKE_Sever + 'email_login_token',
                 data: 'email='+data.email+'&password='+data.password,
                 headers: headers
             };
        return $http(req);
      },
      getFriend: function() {
        var req = {
                 method: "GET",
                 url: FAKE_Sever + 'get_friend',
                 withCredentials: true
             };
        return $http(req);
      },
      getMyGroups: function() {
        var req = {
                 method: "GET",
                 url: FAKE_Sever + 'get_my_group',
                 withCredentials: true
             };
        return $http(req);
      }
   };
   return serverService;
});
