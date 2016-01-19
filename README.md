# 融云 RongCloud Cordova IM v2.0

## Environment Setup

### 初始化开发工具

```
npm install -g cordova ionic

```
如有必要，使用 `sudo npm`

### 安装依赖库

在项目根目录下执行：

```
npm install
ionic state restore
```

### 特别说明
1.发送语音信息需要注意:demo中用到了cordova-plugin-media,这个插件需要在android和ios的源码中修改几个参数
发送语音需要长按 喇叭按钮

2.如果没有测试帐号,请在 [http://webim.demo.rong.io/WebIMDemo/login.html](http://webim.demo.rong.io/WebIMDemo/login.html) 注册

3.demo中没有加好友和群的功能,如果需要这两项操作,请在官网 [http://www.rongcloud.cn/downloads](http://www.rongcloud.cn/downloads) 最下端下载安卓或ios的app,用您注册的帐号登录


### ios  
appFolder/platforms/ios/appFolder/Plugins/cordova-plugin-media/CDVSound.m   audioFile.recorder前加入

```
NSDictionary *recordSetting = @{AVFormatIDKey: @(kAudioFormatLinearPCM),
                               AVSampleRateKey: @8000.00f,
                               AVNumberOfChannelsKey: @1,
                               AVLinearPCMBitDepthKey: @16,
                               AVLinearPCMIsNonInterleaved: @NO,
                               AVLinearPCMIsFloatKey: @NO,
                               AVLinearPCMIsBigEndianKey: @NO};
```

改完后结果为

```
NSDictionary *recordSetting = @{AVFormatIDKey: @(kAudioFormatLinearPCM),
                               AVSampleRateKey: @8000.00f,
                               AVNumberOfChannelsKey: @1,
                               AVLinearPCMBitDepthKey: @16,
                               AVLinearPCMIsNonInterleaved: @NO,
                               AVLinearPCMIsFloatKey: @NO,
                               AVLinearPCMIsBigEndianKey: @NO};
audioFile.recorder = [[CDVAudioRecorder alloc] initWithURL:audioFile.resourceURL settings:recordSetting error:&error];

```

###  android
   appfoldere/platforms/android/src/org/apache/cordova/media/AudioPlayer.java 中  startRecording中  case NONE:中加入并替换为

```
   this.recorder.setAudioSamplingRate(8000);
   this.recorder.setAudioEncodingBitRate(7950);
   this.recorder.setOutputFormat(MediaRecorder.OutputFormat.AMR_NB);
   this.recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
```
