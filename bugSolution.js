//Import necessary modules
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

//Main functional component
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (!cameraReady) {
      console.warn('Camera not ready!');
      return;
    }
    if (hasPermission) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken', photo);
    }
  };

  const [cameraRef, setCameraRef] = useState(null);

  if (hasPermission === null) {
    return <View />;  // Or a loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={ref => {
          setCameraRef(ref);
          // Set up a callback to indicate the camera is ready
        }}
        onCameraReady={handleCameraReady} //Add the onCameraReady handler here
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});