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
发送语音信息需要注意:demo中用到了cordova-plugin-media,这个插件需要在android和ios的源码中修改几个参数
发送语音需要长按 喇叭按钮


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
