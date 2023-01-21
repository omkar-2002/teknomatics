import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import FlashModeService from '../utils/FlashModeService';
import CameraService from '../utils/CameraService';
import useCamera from '../hooks/useCamera';
import useCallbackRef from '../hooks/useCallbackRef';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const flashModeService = new FlashModeService();
const cameraService = new CameraService();

const Camera = () => {
  const navigation = useNavigation();
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const {ref, callbackRef} = useCallbackRef();
  const {
    seconds,
    recording,
    takePicture,
    startRecordingVideo,
    stopRecordingVideo,
  } = useCamera(ref);

  const onTorchPress = () => {
    setFlashMode(flashModeService.getNewFlashMode(flashMode));
  };

  const changeCameraType = () => {
    setCameraType(cameraService.getNewCameraType(cameraType));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 20}}
        onPress={navigation.goBack}>
        <AntDesign name="closecircleo" color={Colors.black.default} size={36} />
      </TouchableOpacity>
      <View
        style={{
          height: 550,
          width: 350,
          borderRadius: 280,
          overflow: 'hidden',
          alignSelf: 'center',
        }}>
        <RNCamera
          ratio={'16:9'}
          ref={callbackRef}
          style={styles.camera}
          type={cameraType}
          flashMode={flashMode}
          captureAudio={true}>
          <View style={styles.header}>
            {cameraService.isBackCamera(cameraType) && (
              <TouchableOpacity
                style={{position: 'absolute', bottom: -200, right: 20}}
                onPress={onTorchPress}>
                {flashMode ? (
                  <MaterialCommunityIcons
                    name="flashlight"
                    color={Colors.white.default}
                    size={36}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="flashlight-off"
                    color={Colors.white.default}
                    size={36}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </RNCamera>
      </View>
      <View style={styles.captureContainer}>
        <TouchableOpacity
          onPress={takePicture}
          onLongPress={startRecordingVideo}
          onPressOut={stopRecordingVideo}
          style={[
            styles.captureButton,
            recording ? styles.captureButtonInProgress : null,
          ]}
        />
      </View>
      {recording && (
        <View style={styles.timer}>
          <Text style={styles.timerText}>Time remaining</Text>
          <View style={styles.timeContainer}>
            <View style={styles.dot} />
            <Text style={styles.timerText}>00:{seconds}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={{position: 'absolute', bottom: 20, right: 20}}
        onPress={changeCameraType}
        disabled={recording}>
        <MaterialCommunityIcons
          name="camera-flip-outline"
          color={Colors.black.default}
          size={36}
        />
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.text}>Hold for video, tap for photo</Text>
      </View>
    </SafeAreaView>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white.default,
    justifyContent: 'center',
  },
  text: {
    color: Colors.black.default,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  captureButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  captureContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  footer: {
    marginTop: 10,
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  timerText: {
    color: Colors.black.default,
    fontWeight: 'bold',
  },
});
