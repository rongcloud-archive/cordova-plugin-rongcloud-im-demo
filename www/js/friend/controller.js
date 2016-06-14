angular.module('cordovaim.frienddetail.controller', ['ionic'])
  .controller('friendDetailCtrl', function($scope, $stateParams, $compile, $ionicPlatform, $rootScope, $cordovaCamera, $cordovaMedia, $cordovaCapture, $cordovaFileTransfer, $cordovaFile, $timeout, newMessageEventService, $ionicScrollDelegate, Friends, Groups) {

    var newMsgCallBack = function(d,data){
      console.log('frienddetail newMessage' + data);
      var jsonMsg = JSON.parse(data);
      if ($stateParams.targetId == jsonMsg.targetId) {
        clearMessagesUnreadStatus();
        var target;
        if(jsonMsg.conversationType == "PRIVATE"){
            target = Friends.get(jsonMsg.targetId);
        }
        else if(jsonMsg.conversationType == "GROUP"){
              target = Groups.get(jsonMsg.targetId);
        }
        else if(jsonMsg.conversationType == "CUSTOMER_SERVICE"){
              // target = Groups.get(jsonMsg.targetId);
        }
        else if(jsonMsg.conversationType == "CHATROOM"){
              // target = Groups.get(jsonMsg.targetId);
        }
        console.log('jsonMsg:', jsonMsg);
        var tmpMsg = myUtil.resolveMsg(jsonMsg);
        console.log(tmpMsg);
        $scope.hisMsgs.push(tmpMsg);
        // $ionicFrostedDelegate.update();
        $ionicScrollDelegate.scrollBottom(true);
      }
    };
    newMessageEventService.listen(newMsgCallBack);
    $scope.doRefresh = function() {

      console.log('Refreshing!');
      $timeout(function() {
        //simulate async response
        getHistoryMsg($stateParams.targetId, $stateParams.conversationType);

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    $scope.buildUrl = function(type) {
      var tmpName;
      switch (type) {
        case 'RC:TxtMsg':
          tmpName = 'txt';
          break;
        case 'RC:ImgMsg':
          tmpName = 'img';
          break;
        case 'RC:DizNtf':
          tmpName = 'diz';
          break;
        case 'RC:LBSMsg':
          tmpName = 'lbs';
          break;
        case 'RC:ImgTextMsg':
          tmpName = 'imgtext';
          break;
        case 'RC:VcMsg':
          tmpName = 'vc';
          break;
        default:

      }
      return 'templates/message/' + tmpName + '.html';
    }
// console.log('platform:'+ionic.Platform.platform());
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var src = "cordovaIMVoice.amr";
    // var path = "/storage/sdcard0/";  //
    var path = "";
    if(isIOS){
      path = cordova.file.documentsDirectory;
      src = "cordovaIMVoice.wav";
    }
    else{
      path = cordova.file.externalApplicationStorageDirectory;
    }
    var mediaRec;

    function getMediaURL(s) {
      if (device.platform.toLowerCase() === "android") return path + s;
      return (path + s).replace('file://', '');
    }

    function getNewMediaURL(s) {
      if (device.platform.toLowerCase() === "android") return path + s;
      return "documents://" + s;
    }

    $scope.play = function(voiFile) {
      console.log('start play!' + voiFile);
      mediaRec = $cordovaMedia.newMedia(voiFile,
        // 成功操作
        function() {
          console.log("play():Audio Success");
          $cordovaMedia.release();
        },
        // 失败操作
        function(err) {
          console.log("play():Audio Error: " + JSON.stringify(err));
        }
      );
      //开始播放录音
      mediaRec.play({ numberOfLoops: 1 });
      return false;

    };
    // $scope.play = function(voiFile) {
    //   console.log('start play!' + voiFile);
    //   mediaRec = new Media(voiFile,
    //     // 成功操作
    //     function() {
    //       console.log("play():Audio Success");
    //     },
    //     // 失败操作
    //     function(err) {
    //       console.log("play():Audio Error: " + JSON.stringify(err));
    //     }
    //   );
    //   //开始播放录音
    //   mediaRec.play();
    //   // mediaRec.release();
    //   return false;
    //
    // };


    // $scope.play = function(voiFile) {
    //   console.log('begin play'+voiFile);
    //   return $ionicPlatform.ready(function() {})
    //     .then(function(voiFile) {
    //
    //       console.log('$ionicPlatform.ready'+voiFile);
    //       return $cordovaFile.checkFile(voiFile);
    //     },function(err){
    //         console.log('err1:'+JSON.stringify(err));
    //     })
    //     .then(function(file) {
    //
    //       console.log('checkFile'+ JSON.stringify(file));
    //       media = $cordovaMedia.newMedia(file.nativeURL);
    //       $cordovaMedia.play(media);
    //     },function(err){
    //         console.log('err2:'+JSON.stringify(err));
    //     });
    // };

    $scope.openImage = function(img) {
       console.log("openImage" + img);
    }

    var appendNewMsg = function(msg, flag) {
      // $scope.lstResult = JSON.stringify(msg);
      var curMsg = myUtil.resolveMsg(msg);
      //消息此时未发送成功，可以加入样式标明；成功后更新样式

      $scope.$apply(function() {
        $scope.hisMsgs.push(curMsg);
      });
      $ionicScrollDelegate.scrollBottom(true);
    }

    // var chMsg = function(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     var jsonMsg = newValue.pop();
    //     if (typeof jsonMsg !== "undefined" && jsonMsg !== "undefined") {
    //       jsonMsg = JSON.parse(jsonMsg);
    //       if ($stateParams.targetId == jsonMsg.targetId) {
    //         clearMessagesUnreadStatus();
    //         var tmpMsg = myUtil.resolveMsg(jsonMsg);
    //         $scope.hisMsgs.push(tmpMsg);
    //       }
    //     }
    //   }
    // }

    //标记已读
    var clearMessagesUnreadStatus = function() {
      RongCloudLibPlugin.clearMessagesUnreadStatus({
          conversationType: $stateParams.conversationType,
          targetId: $stateParams.targetId
        },
        function(ret, err) {
          if (err) {
            alert("clearMessagesUnreadStatus error: " + JSON.stringify(err));
          }
        }
      );
    }

    // var listener = $rootScope.$watch('arrMsgs', chMsg, true); //只用watch着items的变化
    // $scope.$on('$destroy', function() {
    //   //stop watching when scope is destroyed
    //   listener();
    // });
    var getLatestMsg = function(targetid, ctype) {
      RongCloudLibPlugin.getLatestMessages({
          conversationType: ctype,
          targetId: targetid,
          count: 5
        },
        function(ret, err) {
          if (ret) {
            console.log("getLatestMessages:" + JSON.stringify(ret));
            var result = new Array(),
              tmp;
            for (var i = ret.result.length - 1; i >= 0; i--) {
              tmp = ret.result[i];
              tmp = myUtil.resolveMsg(tmp);
              // var tmpContent = $compile(tmp.content)($scope);
              // tmp.content = tmpContent[0];
              result.push(tmp);
              // if(tmp.content.thumbPath){
              //    alert(tmp.content.thumbPath);
              // }
            }
            $scope.hisMsgs = result;
          }
          if (err) {
            alert("getLatestMessages error: " + JSON.stringify(err));
          }

        }
      );
    }

    var getHistoryMsg = function(targetid, ctype) {
      var $targetId = $("#lstMessage");
      var oldestMessageId = $targetId.find("li").first().data("messageid");
      // oldestMessageId = 97;
      console.log("oldestMessageId:" + oldestMessageId);
      RongCloudLibPlugin.getHistoryMessages({
          conversationType: ctype,
          targetId: targetid,
          count: 5,
          oldestMessageId: oldestMessageId
        },
        function(ret, err) {
          if (ret) {
            console.log("getHistoryMessages:" + JSON.stringify(ret));
            var result = new Array(),tmp;
            for (var i = ret.result.length - 1; i >= 0; i--) {
              tmp = ret.result[i];
              tmp = myUtil.resolveMsg(tmp);
              result.push(tmp);
              // alert(JSON.stringify(tmp));
            }
            var hisArr = result.concat($scope.hisMsgs);
            $scope.hisMsgs = hisArr;
          }
          if (err) {
            alert("getHistoryMessages error: " + JSON.stringify(err));
          }
        }
      );
    }

    var sendMessage = function(ctype, target, content) {
      var curMsg;
      RongCloudLibPlugin.sendTextMessage({
          conversationType: ctype,
          targetId: target,
          text: content,
          extra: "this is a extra text"
        },
        function(ret, err) {
          // alert("sendMessage:" + JSON.stringify(ret));
          if (ret) {
            if (ret.status == "prepare") {
              // $scope.lstResult = JSON.stringify(ret);
              console.log(JSON.stringify(ret));
              //消息此时未发送成功，可以加入样式标明；成功后更新样式
              appendNewMsg(ret.result.message, true);
            }
            if (ret.status == "success") {
              // alert("success");
              // 后续加入发送成功后修改显示样式
            }
          }
          if (err) {
            alert("sendTextMessage error: " + JSON.stringify(err));
          }
        }
      );
    }

    var getPhoto = function(sourceType) {
      var options = {
        quality: 50,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false,
        sourceType: sourceType,
        // destinationType: Camera.DestinationType.DATA_URL
        destinationType: Camera.DestinationType.FILE_URI
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        // console.log($stateParams.conversationType + '--' + imageURI);
        var picPath = imageURI;
        console.log("getPicture:" + picPath);
        if(isIOS){
            picPath = imageURI.replace('file://','');
        }
        if(isAndroid){
            picPath = imageURI.substring(0, imageURI.indexOf('?'));
        }
        RongCloudLibPlugin.sendImageMessage({
            conversationType: $stateParams.conversationType,
            targetId: $stateParams.targetId,
            imagePath: picPath,
            extra: "this is a extra text"
          },
          function(ret, err) {
            // $scope.lstResult = JSON.stringify(ret);
            if (ret) {
              if (ret.status == "prepare") {
                //消息此时未发送成功，可以加入样式标明；成功后更新样式
                appendNewMsg(ret.result.message, true);
                console.log("prepare:" +  JSON.stringify(ret.result.message));
                // alert("prepare");
              }
              if (ret.status == "success") {
                // alert("success");
                // 后续加入发送成功后修改显示样式
              }
            }
            if (err) {
              alert("sendImageMessage error: " + JSON.stringify(err));
              console.log("sendImageMessage error: " + JSON.stringify(err));
            }
          }
        );
        // $scope.lstResult = imageURI;
      }, function(err) {
        console.error(err);
      });
    };

    $('#RongIMexpression').qqFace({
      id: 'facebox', //表情盒子的ID
      assign: 'msgContent', //给那个控件赋值
      path: 'img/face/' //表情存放的路径
    });

    $("#showMore").bind('click', function() {
      var RongIMmoreObj = $(".RongIMmoreWrap");
      if (RongIMmoreObj.is(":visible")) {
        RongIMmoreObj.hide()
      } else {
        RongIMmoreObj.show()
      }
      return false;
      // RongIMexpressionObj.slideToggle();
    });

    $("#butAlbum").bind('click', function() {
      getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
      return false;
    });

    $("#butTakePic").bind('click', function() {
      getPhoto(Camera.PictureSourceType.CAMERA);
      return false;
    });

    $("#butLocation").bind('click', function() {
      var url = "http://api.map.baidu.com/staticimage?center=116.378948,39.917527&width=280&height=168&zoom=18";
      var targetPath = cordova.file.applicationStorageDirectory + "loc_xidan2.png";
      // var targetPath = 'fs://loc_xidan.png';
      var trustHosts = true
      var options = {};

      $cordovaFile.checkFile(cordova.file.applicationStorageDirectory, "loc_xidan2.png")
        .then(function(result) {
          // success
          console.log('checkFile:'+JSON.stringify(result));
          RongCloudLibPlugin.sendLocationMessage({
              // conversationType: "PRIVATE",
              // targetId: "apple",
              conversationType: $stateParams.conversationType,
              targetId: $stateParams.targetId,
              latitude: Number(39.917527),
              longitude: Number(116.378948),
              poi: "西城区西单北大街大悦城购物中心10层",
              imagePath: result.fullPath,
              extra: "this is a extra text"
            },
            function(ret, err) {
              if (ret) {
                // $scope.lstResult = JSON.stringify(ret);
                if (ret.status == "prepare") {
                  // $scope.lstResult = JSON.stringify(ret);
                  //消息此时未发送成功，可以加入样式标明；成功后更新样式
                  appendNewMsg(ret.result.message, true);
                  console.log('sendLocationMessage prepare:'+JSON.stringify(ret));
                  // alert("prepare");
                }
                if (ret.status == "success") {
                  // alert("success");
                  // 后续加入发送成功后修改显示样式
                }
              }
              if (err) {
                alert("sendLocationMessage error: " + JSON.stringify(err));
              }
            }
          );
        }, function(error) {
          // error
          alert('checkFile err:' + JSON.stringify(error));
          console.log('checkFile err:' + JSON.stringify(error));
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
        });


      // $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      //   .then(function(result) {
      //     // Success!
      //     alert('targetPath:'+targetPath);
      //     alert('result:'+ JSON.stringify(result));
      //     RongCloudLibPlugin.sendLocationMessage(
      //                 function(ret) {
      //                   $scope.lstResult = JSON.stringify(ret);
      //                 },
      //                 function(error) { alert( "sendLocationMessage error: " + JSON.stringify(error) ); },
      //                 {
      //                     // conversationType: "PRIVATE",
      //                     // targetId: "apple",
      //                     conversationType: $stateParams.conversationType,
      //                     targetId: $stateParams.targetId,
      //                     latitude: 39.917527,
      //                     longitude: 116.378948,
      //                     poi: "西城区西单北大街大悦城购物中心10层",
      //                     imageUri: result.fullPath,
      //                     extra: "this is a extra text"
      //                 }
      //     );
      //   }, function(err) {
      //     // Error
      //   }, function (progress) {
      //     $timeout(function () {
      //       $scope.downloadProgress = (progress.loaded / progress.total) * 100;
      //     })
      //   });


      return false;
    });

    $("#butRichContent").bind('click', function() {
      RongCloudLibPlugin.sendRichContentMessage({
          conversationType: $stateParams.conversationType,
          targetId: $stateParams.targetId,
          title: "rongCloud cordovaIM", // 消息的标题.
          description: '融云SDK Cordova 版', // 消息的简介.
          imageUrl: 'http://www.rongcloud.cn/images/logo.png', // 消息图片的网络地址.
          extra: 'From RongCloud Cordova' // 消息的附加信息.
        },
        function(ret, err) {
          if (ret) {
            // $scope.lstResult = JSON.stringify(ret);
            if (ret.status == "prepare") {
              //消息此时未发送成功，可以加入样式标明；成功后更新样式
              appendNewMsg(ret.result.message, true);
              // alert("prepare");
            }
            if (ret.status == "success") {
              // alert("success");
              // 后续加入发送成功后修改显示样式
            }
          }
          if (err) {
            alert("sendRichContentMessage error: " + JSON.stringify(error));
          }
        }
      );
      return false;
    });

    $("#msgContent").bind("click", function() {
      if ($(".RongIMexpressionWrap").is(":visible"))
        $("#RongIMexpression").trigger('click');
    });

    $scope.sendMsg = function() {
      var msgContent = $("#msgContent").val();
      $("#msgContent").val('');
      // msgContent = replace_em(msgContent);
      sendMessage($stateParams.conversationType, $stateParams.targetId, msgContent);
    }

    $("#butVoice1").bind("click", function() {
      // var amrFile = '/Users/zy/Library/Developer/CoreSimulator/Devices/C9273CC2-643D-4E2B-9860-BFD17CAAD20B/data/Containers/Data/Application/F6C338BF-181F-4E46-8769-F25E554CC0AA/tmp/cordovaIMVoice.wav';
      // var options = {
      //   limit: 1,
      //   duration: 10
      // };
      // $cordovaCapture.captureAudio(options).then(function(mediaFiles) {
      //   // Success! Audio data is here
      //   var i, path, len;
      //   for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      //     path = mediaFiles[i].fullPath;
      //     console.log('path:' + path);
      //     console.log('amr path:' + cordova.file.applicationDirectory + 'www/img/test.amr');
      //     RongCloudLibPlugin.sendVoiceMessage({
      //         conversationType: $stateParams.conversationType,
      //         targetId: $stateParams.targetId,
      //         voicePath: path,
      //         duration: 5,
      //         extra: "this is a extra voice"
      //       },
      //       function(ret, err) {
      //         if (ret) {
      //           // $scope.lstResult = "sendVoiceMessage:" + JSON.stringify(ret);
      //         }
      //         if (err) {
      //           alert("sendVoiceMessage error: " + JSON.stringify(err));
      //         }
      //       }
      //     );
      //     // do something interesting with the file
      //   }
      // }, function(err) {
      //   // An error occurred. Show a message to the user
      //   console.log("$cordovaCapture.captureAudio err:" + err);
      // });

      // var url = 'http://7i7gc6.com1.z0.glb.clouddn.com/testVoice.amr';
      // var targetPath = cordova.file.applicationStorageDirectory + "testVoice.amr";
      // var trustHosts = true
      // var options = {};
      //
      // $cordovaFile.checkFile(cordova.file.applicationStorageDirectory, "testVoice.amr")
      //   .then(function(result) {
      //     // success
      //     console.log('checkFile:'+JSON.stringify(result));
      //     RongCloudLibPlugin.sendVoiceMessage({
      //         conversationType: $stateParams.conversationType,
      //         targetId: $stateParams.targetId,
      //         voicePath: result.fullPath,
      //         duration: 5,
      //         extra: "this is a extra voice"
      //       },
      //       function(ret, err) {
      //         if (ret) {
      //           // $scope.lstResult = "sendVoiceMessage:" + JSON.stringify(ret);
      //         }
      //         if (err) {
      //           alert("sendVoiceMessage error: " + JSON.stringify(err));
      //         }
      //       }
      //     );
      //
      //   }, function(error) {
      //     // error
      //     alert('checkFile err:' + JSON.stringify(error));
      //     console.log('checkFile err:' + JSON.stringify(error));
      //     $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      //       .then(function(result) {
      //         // Success!
      //         console.log('targetPath:'+targetPath);
      //         console.log('result:'+ JSON.stringify(result));
      //
      //       }, function(err) {
      //         // Error
      //         console.log('download amrFile err:' + JSON.stringify(err));
      //       }, function (progress) {
      //         // $timeout(function () {
      //         //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
      //         // })
      //       });
      //   });

       var options = {
          limit: 1,
          duration: 10
        };
        $cordovaCapture.captureAudio(options).then(function(mediaFiles) {
          // Success! Audio data is here
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log('path:'+path);
            RongCloudLibPlugin.sendVoiceMessage({
                conversationType: $stateParams.conversationType,
                targetId: $stateParams.targetId,
                voicePath: path,
                duration: 5,
                extra: "this is a extra voice"
              },
              function(ret, err) {
                if (ret) {
                  console.log("sendVoiceMessage:" + JSON.stringify(ret));
                  if (ret.status == "prepare") {
                    //消息此时未发送成功，可以加入样式标明；成功后更新样式
                    appendNewMsg(ret.result.message, true);
                    // alert("prepare");
                  }
                  if (ret.status == "success") {
                    // alert("success");
                    // 后续加入发送成功后修改显示样式
                  }
                }
                if (err) {
                  alert("sendVoiceMessage error: " + JSON.stringify(err));
                  console.log("sendVoiceMessage error: " + JSON.stringify(err));
                }
              }
            );

          }
        }, function(err) {
          // An error occurred. Show a message to the user
          console.log("$cordovaCapture.captureAudio err:" + err);
        });

      return false;
    });

    // var src = "cordovaIMVoice.wav";
    //开始录音
    // function start() {
    //   //定义录音文件保存名称及位置（android默认保存在根目录）
    //   //var src = "sounds/cordovaIMVoice.amr";
    //   //实例化录音类
    //   mediaRec = new Media(src,
    //     // 录音执行函数
    //     function() {
    //       console.log("start():Audio Success");
    //     },
    //     // 录音失败执行函数
    //     function(err) {
    //       console.log("start():Audio Error: " + err.code);
    //     }
    //   );
    // }
    //
    // //为按钮绑定  touchstart(点击) 事件
    // $("#butVoice").on("touchstart", function() {
    //   //实例化录音类
    //   start();
    //   //开始录音
    //   mediaRec.startRecord();
    //   date1 = new Date();
    //   $("#msgContent").val("开始录音");
    //   return false;
    // });
    //
    // //为按钮绑定 touchmove(手势移动) 事件
    // $("#butVoice1").on("touchmove", function(e) {
    //   //这里很关键，如果手势移动会执行另外一个操作，录音就会终止，所以此处需要禁止移动的默认操作。
    //   e.preventDefault();
    //   return false;
    //   //date3 =new Date();
    //   //$("#test").html("滑动了"+(date3.getTime()-date1.getTime())/1000);
    // });
    // //为按钮绑定 touchend(手势离开)事件
    // $("#butVoice1").on("touchend", function() {
    //   //结束录音
    //   mediaRec.stopRecord();
    //   //释放系统底层的音频播放资源
    //   mediaRec.release();
    //   //需要播放的录音的路径
    //   //var src = "test.mp3";
    //   //实例化录音类
    //   mediaRec = new Media(src,
    //     // 成功操作
    //     function() {
    //       console.log("start():Audio Success");
    //     },
    //     // 失败操作
    //     function(err) {
    //       console.log("start():Audio Error: " + err.code);
    //     }
    //   );
    //
    //   //在html中显示当前状态
    //   $("#msgContent").val("停止录音");
    //   //开始播放录音
    //   mediaRec.play();
    //   //在html中显示当前状态
    //   $("#msgContent").val("--开始播放录音");
    //   return false;
    //
    // });
    // //判断手势操作有没有变化
    // $("#butVoice1").on("touchcancel", function(e) {
    //   //  date2 =new Date();
    //   //  $("#msgContent").val("状态变化了"+e.type+(date2.getTime()-date1.getTime())/1000);
    // });

    //开始录音
    function start() {
      //定义录音文件保存名称及位置（android默认保存在根目录）
      //var src = "sounds/cordovaIMVoice.amr";
      //实例化录音类
      if (mediaRec) {
        mediaRec.release();
      }
      // console.log('path:' + path);
      // $cordovaFile.removeFile(path, src)
      //   .then(function(success) {
      //     // success
      //     console.log('removeFile:' + JSON.stringify(success));
      //
      //   }, function(error) {
      //     // error
      //     console.log('removeFile err:' + JSON.stringify(error));
      //   });

      mediaRec = new Media(getNewMediaURL(src),
        // 录音执行函数
        function() {
          console.log("start():Audio Success");
        },
        // 录音失败执行函数
        function(err) {
          console.log("start():Audio Error: " + JSON.stringify(err)+ "----"+getMediaURL(src));
        }
      );
    }

    //为按钮绑定  touchstart(点击) 事件
    $("#butVoice").on("touchstart", function() {

      //实例化录音类
      start();
      //开始录音
      mediaRec.startRecord();
      date1 = new Date();
      $("#msgContent").val("开始录音");
      return false;
    });

    //为按钮绑定 touchmove(手势移动) 事件
    $("#butVoice").on("touchmove", function(e) {
      //这里很关键，如果手势移动会执行另外一个操作，录音就会终止，所以此处需要禁止移动的默认操作。
      e.preventDefault();
      return false;
      //date3 =new Date();
      //$("#test").html("滑动了"+(date3.getTime()-date1.getTime())/1000);
    });
    //为按钮绑定 touchend(手势离开)事件
    $("#butVoice").on("touchend", function() {
      if (mediaRec) {
        //结束录音
        mediaRec.stopRecord();
        //释放系统底层的音频播放资源
        mediaRec.release();
      }
      //需要播放的录音的路径
      //实例化录音类
      mediaRec = new Media(getMediaURL(src),
        // 成功操作
        function() {
          console.log("touchend():Audio Success");
        },
        // 失败操作
        function(err) {
          console.log("touchend():Audio Error: " + err.code);
        }
      );

      // $cordovaMedia.play(getMediaURL(src));
      // dur = $cordovaMedia.getDuration(getMediaURL(src));
      // var counter = 0;
      // timerDur = setInterval(function() {
      //     counter = counter + 100;
      //     if (dur < 0) {
      //         dur = $cordovaMedia.getDuration(getMediaURL(src));
      //     }
      //     // $("#msg").html((counter / 1000).toMMSS() + "/" + dur.toMMSS());
      //     if (dur > 0 && counter / 1000 > dur) {
      //         console.log('dur:'+dur);
      //         clearInterval(timerDur);
      //         $cordovaMedia.stop(media);
      //         $cordovaMedia.release(media);
      //     }
      // }, 100);
      //
      // return;
      //在html中显示当前状态
      $("#msgContent").val("停止录音");
      //开始播放录音
      mediaRec.play();
      mediaRec.stop();
      //在html中显示当前状态
      //$("#msgContent").val("--开始播放录音");
      var counter = 0;
      var timerDur = setInterval(function() {
        counter = counter + 100;
        if (counter > 2000) {
          clearInterval(timerDur);
        }
        var dur = mediaRec.getDuration();
        if (dur > 0) {
          clearInterval(timerDur);
          console.log('mediaRec.getDuration():' + dur);
          console.log('mediaRec.src:' + mediaRec.src);
          var tmpPath = mediaRec.src;
          if(isIOS){
               tmpPath = path + src;
          }
          tmpPath = tmpPath.replace('file://', '');
          console.log('tmpPath:' + tmpPath);


          RongCloudLibPlugin.sendVoiceMessage({
              conversationType: $stateParams.conversationType,
              targetId: $stateParams.targetId,
              // voicePath:  '/storage/sdcard0/6599.amr',
              voicePath: tmpPath,
              duration: dur,
              extra: "99 extra voice"
            },
            function(ret, err) {
              mediaRec.release();
              $cordovaFile.removeFile(path, src)
                .then(function(success) {
                  // success
                  console.log('removeFile2:' + JSON.stringify(success));

                }, function(error) {
                  // error
                  console.log('removeFile2 err:' + JSON.stringify(error));
                });
              if (ret) {
                $scope.lstResult = "sendVoiceMessage:" + JSON.stringify(ret);
                if (ret.status == "prepare") {
                  //消息此时未发送成功，可以加入样式标明；成功后更新样式

                  console.log("sendVoiceMessage prepare2:" + JSON.stringify(ret));
                  appendNewMsg(ret.result.message, true);
                  // alert("prepare");
                }
                if (ret.status == "success") {
                  // alert("success");
                  // 后续加入发送成功后修改显示样式
                }

              }
              if (err) {
                alert("sendVoiceMessage error: " + JSON.stringify(err));
              }
            }
          );
        }
      }, 100);

      return false;

    });
    //判断手势操作有没有变化
    $("#butVoice").on("touchcancel", function(e) {
      //  date2 =new Date();
      //  $("#msgContent").val("状态变化了"+e.type+(date2.getTime()-date1.getTime())/1000);
    });
    var init = function() {
      // drawExpressionWrap();
      // $("#RongIMexpression").trigger('click');
      // $("#showMore").trigger('click');

      $scope.hisMsgs = [];
      $scope.curUID = $rootScope.curUID ? $rootScope.curUID : "";
      $scope.targetId = $stateParams.targetId;
      if($stateParams.conversationType == 'PRIVATE'){
        $scope.target = Friends.get($stateParams.targetId);
      }else if($stateParams.conversationType == 'GROUP'){
        $scope.target = Groups.get($stateParams.targetId);
        if($scope.target){
          $scope.target.username = $scope.target.name;
        }
        else{
          $scope.target = { username: '未知群组'}
        }
      }
      clearMessagesUnreadStatus();
      if($stateParams.conversationType == "CUSTOMER_SERVICE"){
            return;
      }
      else if($stateParams.conversationType == "CHATROOM"){
            RongCloudLibPlugin.joinChatRoom({
                    chatRoomId: $stateParams.targetId,
                    defMessageCount: 20
                }, function (ret, err) {
                  if(ret){
                    if (ret.status == 'success')
                        console.log("joinChatRoom", JSON.stringify(ret));
                  }
                  if(err){
                    alert('joinChatRoom error:' + err.code);
                  }
            })
            return;
      }
      else if($stateParams.conversationType == "DISCUSSION"){
            $scope.hisMsgs = [];
            RongCloudLibPlugin.addMemberToDiscussion({
                    discussionId: $stateParams.targetId,
                    userIdList: [$scope.curUID]
                }, function (ret, err) {
                  if(ret){
                    if (ret.status == 'success')
                        console.log("addMemberToDiscussion", JSON.stringify(ret));
                  }
                  if(err){
                      console.log('addMemberToDiscussion error:' + err.code);
                  }
            })
      }

      getLatestMsg($stateParams.targetId, $stateParams.conversationType);

      $scope.$on("$ionicView.enter", function () {
        $ionicScrollDelegate.scrollBottom(true);
        console.log('$ionicView.enter');
      });


    }
    init();

  })

  .directive('hideTabs', function($rootScope) {
      return {
          restrict: 'A',
          link: function($scope, $el) {
              $scope.$on("$ionicView.beforeEnter", function () {
                $rootScope.hideTabs = true;
              });
              $scope.$on("$ionicView.beforeLeave", function () {
                $rootScope.hideTabs = false;
              });
          }
      };
  });
