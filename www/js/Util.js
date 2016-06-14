/**
 * Created by Administrator on 2015/9/10.
 */
var _appKey = "z3v5yqkbv8v30";
String.stringFormat = function(str) {
  for (var i = 1; i < arguments.length; i++) {
    str = str.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i] != undefined ? arguments[i] : "");
  }
  return str;
};
var _curUID = '';
var myUtil = {
  //解析一条会话  flas:0-conversation;1-message
  setUserId: function(id) {
    _curUID = id;
  },
  getUserId: function() {
    return _curUID;
  },
  resoveDizNft: function(msg) {
    var result = '', operator = msg.operator;
    var userId = _curUID, extension = msg.extension;
    if (userId == operator)
       result = '您';
    else
       result = operator;
    switch (msg.type) {
      case 1:
        if (userId == operator) {
          result += '邀请了' + extension + '加入了群聊';
        } else {
          var memberId = extension.split(',');
          var otherId = arrayRemove(memberId, userId);
          //result += '邀请了您';
          if (otherId){
            result += '邀请了您';
            if(otherId.lenght > 0)
               result += '和' + otherId;
          }
          else {
            result += '邀请了' + extension;
          }
          result += '加入了讨论组';
        }
        break;
      case 2:
           result += '退出了讨论组';
        break;
      case 3:
        result += '修改讨论组名称为' + extension;
        break;
      case 4:
        result += '踢出了' + msg.extension;
        break;
      case 5:
        result += '修改讨论组邀请状态为' + extension == '0' ? '免打扰' : '提醒';
        break;
    }
    return result;
  },
  resolveCon: function(con, flag, user) {
    try {
      var conversation = con;
      var date = new Date(conversation.sentTime);
      var time = date.getHours() + ":" + date.getMinutes();
      var targetId = conversation.targetId;
      var text = '';
      var conversationType = conversation.conversationType;
      var conversationTitle = conversation.conversationTitle;
      var title = '';
      var senderUserId = conversation.senderUserId;
      var uname;
      conversation.sentTime = time;

      switch (conversationType) {
        case 'PRIVATE':
          uname = user ? user.username : '陌生人';
          title = uname;
          break;
        case 'DISCUSSION':
          var aa = conversationTitle;
          title = '讨论组(' + aa + ')';
          break;
        case 'GROUP':
          title = targetId;
          uname = user ? user.name : '未知群'
          title = '群组(' + uname + ')';
          break;
        case 'SYSTEM':
          title = targetId;
          uname = user ? user.name : '未知'
          title = '系统消息(' + targetId + ')';
          break;

      }
      conversation.conversationTitle = title;
      var objectName = conversation.objectName;
      if (objectName == 'RC:TxtMsg') {
        if (flag) {
          text = conversation.content.text;
        } else {
          text = conversation.latestMessage.text;
        }
        text = replace_em(text);
      } else if (objectName == 'RC:ImgMsg') {
        text = '[图片]';
      } else if (objectName == 'RC:DizNtf') { //刚创建讨论组时，讨论组的第一条信息的类型
        //获取讨论组创建人
        // var operator = conversation.latestMessage.operator;
        // //  var operator = typeof(conversation.latestMessage) == "undefined" ? "" : conversation.latestMessage.operator;
        // //  var userId = localStorage.getItem('userId');
        // var userId = _curUID;
        // var extension = conversation.latestMessage.extension;
        // //  var extension = typeof(conversation.latestMessage) == "undefined" ? "" : conversation.latestMessage.extension;
        // if (userId == operator) {
        //   text = '你邀请了' + extension + '加入了群聊';
        // } else {
        //   var memberId = extension.split(',');
        //   var otherId = arrayRemove(memberId, userId);
        //   text = operator + '邀请了您';
        //   if (otherId.length > 0)
        //     text += '和' + otherId;
        //   text += '加入了讨论组';
        // }
        if (flag) {
          text = myUtil.resoveDizNft(conversation.content);
        }
        else{
          text = myUtil.resoveDizNft(conversation.latestMessage);
        }

      } else if (objectName == 'RC:LBSMsg') {
        text = '[位置]';
      } else if (objectName == 'RC:ImgTextMsg') {
        text = '[连接]';
      } else if (objectName == 'RC:VcMsg') {
        text = '[语音]';
      }
      conversation.latestMessage = text;
      if(conversationType == 'GROUP'){conversation.latestMessage = senderUserId + ':' +text;}
      conversation.portrait = user ? user.portrait : '';
      //  alert('resolveCon:'+conversation.latestMessage );
    } catch (e) {
      alert('resolveCon error:'+e);
      console.error('resolveCon error:'+e);
      console.error('resolveCon error:'+JSON.stringify(con));
    }
    return conversation;
  },
  //解析一条消息
  resolveMsg: function(msg) {
    try {
      var message = msg;
      var date = new Date(message.sentTime);
      var time = date.getHours() + ":" + date.getMinutes();
      var text = '';
      var messageType = message.conversationType;
      var objectName = message.objectName;
      message.sentTime = time;
      if (objectName == 'RC:TxtMsg') {
        text = message.content.text;
        text = replace_em(text);
        message.content.text = text;
      }
      else if (objectName == 'RC:DizNtf') { //刚创建讨论组时，讨论组的第一条信息的类型
        text = myUtil.resoveDizNft(message.content);
        message.content.text = text;
      }
      // if (objectName == 'RC:TxtMsg') {
      //   text = message.content.text;
      //   text = replace_em(text);
      // } else if (objectName == 'RC:ImgMsg') {
      //   text = '[图片]' + message.content.thumbPath;
      //   text = '<div class="detail imageMsgWrap">' +
      //     '<img onclick="openImage(\'' + message.content.imageUrl + '\')" tapmode="" class="imageMsg" src="' + message.content.thumbPath + '"/></div>';
      // } else if (objectName == 'RC:DizNtf') { //刚创建讨论组时，讨论组的第一条信息的类型
      //
      //   text = myUtil.resoveDizNft(message.content);
      // } else if (objectName == 'RC:LBSMsg') {
      //   // alert(JSON.stringify(message.content));
      //   text = '[位置]' + message.content.poi;
      //   text = '<span class="location_img" style="background-image: url(\'' + message.content.imagePath + '\')"></span>' +
      //     '<span class="location_desc">' +  message.content.poi + '</span>';
      //
      //   // alert(message.content.extra);
      // } else if (objectName == 'RC:ImgTextMsg') {
      //   // alert(JSON.stringify(message.content));
      //   text = '[图文]' + message.content.title + '-' + message.content.imageUrl;
      //   text = '<div class="title">' + message.content.title + '</div><div class="right"><img src="' + message.content.imageUrl + '">' +
      //     '<div class="desc">' + message.content.description + '</div></div>';
      //
      // } else if (objectName == 'RC:VcMsg') {
      //   text = '[语音]';
      //   text = '<div class="detail voice">' +
      //     '<div class="second">' + message.content.duration + '\'\'</div><div class="text"><button ng-click="play(\'' + message.content.voicePath + '\')" class="icon-playing">[play]</button></div>';
      // }
      // message.voicePath = message.content.voicePath;
      // message.content = text;


    } catch (e) {
        alert('resolveMsg error:'+e);
        console.error('resolveMsg error:'+e);
        console.error('resolveMsg error:'+JSON.stringify(msg));
    }
    return message;
  },
  play: function(obj, src) {

  },
  openImage: function(src) {

  },
  msgType: function(message, operator) {
    switch (message.getMessageType()) {
      case RongIMClient.MessageType.TextMessage:
        //return String.stringFormat('<div class="msgBody">{0}</div>', this.initEmotion(this.symbolReplace(message.getContent())));
        return this.initEmotion(this.symbolReplace(message.getContent()));
      case RongIMClient.MessageType.ImageMessage:
        return String.stringFormat('<div class="msgBody">{0}</div>', "<img class='imgThumbnail' src='data:image/jpg;base64," + message.getContent() + "' bigUrl='" + message.getImageUri() + "'/>");
      case RongIMClient.MessageType.VoiceMessage:
        return String.stringFormat('<div class="msgBody voice">{0}</div><a class="button button-icon icon ion-music-note" href="#" onclick="RongIMClient.voice.play(\'' + message.getContent() + '\',\'' + message.getDuration() + '\')"></a><input type="hidden" value="' + message.getContent() + '">', "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + message.getDuration());
      case RongIMClient.MessageType.LocationMessage:
        return String.stringFormat('<div class="msgBody">{0}</div>{1}', "[位置消息]" + message.getPoi(), "<img src='data:image/png;base64," + message.getContent() + "'/>");
      case RongIMClient.MessageType.DiscussionNotificationMessage:
        // 您收到一条新信息:{"messageType":"DiscussionNotificationMessage","details":{"type":1,"operator":"aaa8925","extension":"apple"},"objectName":"RC:DizNtf"}1 testengine.js:279:3
        var memberStr = message.getDetail().extension;
        if (operator == message.getDetail().operator) {
          return String.stringFormat('<div class="msgBody">你邀请{0}加入了群聊</div>', memberStr);
        } else {
          memberStr = memberStr.replace(operator, '');
          return String.stringFormat('<div class="msgBody">{0}邀请你{1}加入了群聊</div>', message.getDetail().operator, memberStr.length > 0 ? '和' + memberStr : '');
        }

      default:
        return '<div class="msgBody">' + message.getMessageType().toString() + ':此消息类型Demo未解析</div>'
    }
  },
  initEmotion: function(str) {
    var a = document.createElement("span");
    return RongIMClient.Expression.retrievalEmoji(str, function(img) {
      a.appendChild(img.img);
      var str = '<span class="RongIMexpression_' + img.englishName + '">' + a.innerHTML + '</span>';
      a.innerHTML = "";
      return str;
    });
  },
  symbolReplace: function(str) {
    if (!str) return '';
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  },
  replaceSymbol: function(str) {
    if (!str) return '';
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&nbsp;/g, " ");
    return str;
  }
};

function arrayIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
}

function arrayRemove(arr, val) {
  var index = arrayIndexOf(arr, val);
  if (index > -1) {
    arr.splice(index, 1);
    return arr;
  }
}



/*function arrayIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
}


function arrayRemove(arr, val) {
  var index = arrayIndexOf(arr, val);
  if (index > -1) {
    arr.splice(index, 1);
    return arr;
  }
}*/

function replace_em(str) {
  str = str.replace(/\</g, '&lt;');
  str = str.replace(/\>/g, '&gt;');
  str = str.replace(/\n/g, '<br/>');
  str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/face/$1.gif" border="0" />');
  return str;
}

//比较json是否完全相同
// Object.prototype.equals = function(x){
//   var p;
//   for(p in this) {
//       if(typeof(x[p])=='undefined') {return false;}
//   }
//
//   for(p in this) {
//       if (this[p]) {
//           switch(typeof(this[p])) {
//               case 'object':
//                   if (!this[p].equals(x[p])) { return false; } break;
//               case 'function':
//                   if (typeof(x[p])=='undefined' ||
//                       (p != 'equals' && this[p].toString() != x[p].toString()))
//                       return false;
//                   break;
//               default:
//                   if (this[p] != x[p]) { return false; }
//           }
//       } else {
//           if (x[p])
//               return false;
//       }
//   }
//
//   for(p in x) {
//       if(typeof(this[p])=='undefined') {return false;}
//   }
//
//   return true;
// };

//比较json结构是否相同
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

//比较json是否完全相同
var jsonEquals = function(jsonA, jsonB) {
  var p;
  for (p in jsonA) {
    if (typeof(jsonB[p]) == 'undefined') {
      return false;
    }
  }

  for (p in jsonA) {
    if (jsonA[p]) {
      switch (typeof(jsonA[p])) {
        case 'object':
          if (!jsonEquals(jsonA[p], jsonB[p])) {
            return false;
          }
          break;
        case 'function':
          if (typeof(jsonB[p]) == 'undefined' ||
            (p != 'equals' && jsonA[p].toString() != jsonB[p].toString()))
            return false;
          break;
        default:
          if (jsonA[p] != jsonB[p]) {
            return false;
          }
      }
    } else {
      if (typeof(jsonA[p]) == 'undefined' && jsonB[p])
        return false;
    }
  }

  for (p in jsonB) {
    if (typeof(jsonA[p]) == 'undefined') {
      return false;
    }
  }

  return true;
};

/**
 * Created by andy on 14-12-25.
 */
/**
 *
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 **/

function SHA1(msg) {

    function rotate_left(n, s) {
        var t4 = ( n << s ) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
        msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}
