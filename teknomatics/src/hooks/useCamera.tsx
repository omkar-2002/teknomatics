import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {RNCamera} from 'react-native-camera';
import TimerService from '../utils/TimerService';
import RNFS from 'react-native-fs';

const timerService = new TimerService();

const useCamera = (ref: RNCamera | null) => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(45);

  const cameraActionProxy = (cb: (camera: RNCamera) => void) => {
    if (!ref) {
      return () => void 0;
    }
    return () => cb(ref);
  };

  const takePicture = async (camera: RNCamera) => {
    try {
      const {uri} = await camera.takePictureAsync();
      // do anything you want with the uri of the image
      // for example, take to the preview screen
      // navigation.navigate('ImagePreview', {uri});
      Alert.alert('Image', uri);
    } catch (e) {
      console.log('Failed to take a picture: ', e);
    }
  };

  const startRecordingVideo = async (camera: RNCamera) => {
    try {
      timerService.startTimer(countdown);
      setRecording(true);
      const {uri} = await camera.recordAsync();
      // do anything you want with the uri of the video
      // for example, take to the preview screen
      // navigation.navigate('VideoPreview', {uri});
      // const LOCAL_PATH_TO_VIDEO =
      //   Platform.OS === 'ios'
      //     ? `${RNFS.DocumentDirectoryPath}/mood-pixel-${timestamp}.mp4`
      //     : `${RNFS.ExternalDirectoryPath}/mood-pixel-${timestamp}.mp4`;
      //   RNFS.downloadFile({  fromUrl: uri,
      //     toFile: LOCAL_PATH_TO_VIDEO}).then(() => {
      //     console.log("Video copied locally!!");
      // }, (error) => {
      //     console.log("CopyFile fail for video: " + error);
      // });
      let filePath = uri;
      let newFilePath =
        RNFS.PicturesDirectoryPath + `video${Math.random()}.mp4`;
      RNFS.moveFile(filePath, newFilePath)
        .then(() => console.log('Successfully uploaded'))
        .catch(e =>{
          console.log(e)
        });

      Alert.alert('Video', uri);
    } catch (e) {
      console.log('Failed to start recording: ', e);
    }
  };

  const stopRecordingVideo = async (camera: RNCamera) => {
    if (!recording) {
      return;
    }
    try {
      timerService.stopTimer();
      setSeconds(45);
      setRecording(false);
      await camera.stopRecording();
    } catch (e) {
      console.log('Failed to stop recording: ', e);
    }
  };

  const countdown = () => {
    setSeconds(prevSeconds => {
      const newSeconds = prevSeconds - 1;
      if (newSeconds === 0) {
        timerService.stopTimer();
        cameraActionProxy(stopRecordingVideo)();
      }
      return newSeconds;
    });
  };

  return {
    seconds,
    recording,
    takePicture: cameraActionProxy(takePicture),
    startRecordingVideo: cameraActionProxy(startRecordingVideo),
    stopRecordingVideo: cameraActionProxy(stopRecordingVideo),
  };
};

export default useCamera;
