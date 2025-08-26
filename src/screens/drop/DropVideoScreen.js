import { 
  Alert, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  PermissionsAndroid
} from 'react-native'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import AddSoundModal from './component/AddSoundModal'
import DropDetailsModal from './component/DropDetailsModal'
import Style from '../../style/Style'
import COLORS from '../../style/colors'
import { createFormData } from '../../utils/common'

const { width, height } = Dimensions.get('window')

const DropVideoScreen = () => {
  const [visible, setVisible] = useState(false)
  const [dropDetailsVisible, setDropDetailsVisible] = useState(false)
  const [selectedSound, setSelectedSound] = useState(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [cameraPosition, setCameraPosition] = useState('back')
  const [cameraError, setCameraError] = useState(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  
  const camera = useRef(null)
  const devices = useCameraDevices()
  
  // Improved device selection logic
  const device = useMemo(() => {
    if (!devices) return null
    
    // Try to find device by position
    const deviceByPosition = devices[cameraPosition]
    if (deviceByPosition) return deviceByPosition
    
    // Fallback: find device by position in device list
    const deviceList = Object.values(devices)
    const deviceByPositionFallback = deviceList.find(d => d.position === cameraPosition)
    if (deviceByPositionFallback) return deviceByPositionFallback
    
    // If no device found for current position, try to find any available device
    if (deviceList.length > 0) {
      console.log('No device found for position:', cameraPosition, 'Using first available device')
      return deviceList[0]
    }
    
    return null
  }, [devices, cameraPosition])

  // Debug camera devices
  useEffect(() => {
    console.log('Available devices:', devices)
    console.log('Current device:', device)
    console.log('Camera position:', cameraPosition)
    console.log('Device keys:', devices ? Object.keys(devices) : 'No devices')
    console.log('Device values:', devices ? Object.values(devices).map(d => ({ id: d.id, position: d.position, name: d.name })) : 'No devices')
  }, [devices, device, cameraPosition])

  // Request camera permissions
  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Fuugohub needs access to your camera to record videos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const micGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Microphone Permission',
              message: 'Fuugohub needs access to your microphone to record audio',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          )
          setHasPermission(micGranted === PermissionsAndroid.RESULTS.GRANTED)
        } else {
          setHasPermission(false)
        }
      } else {
        const cameraPermission = await request(PERMISSIONS.IOS.CAMERA)
        const micPermission = await request(PERMISSIONS.IOS.MICROPHONE)
        setHasPermission(cameraPermission === RESULTS.GRANTED && micPermission === RESULTS.GRANTED)
      }
    } catch (error) {
      console.error('Permission request error:', error)
      setHasPermission(false)
    }
  }

  useEffect(() => {
    requestCameraPermission()
  }, [])

  // Set camera ready after a delay to allow initialization
  useEffect(() => {
    if (device && hasPermission) {
      const timer = setTimeout(() => {
        setIsCameraReady(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [device, hasPermission])

  const startRecording = async () => {
    if (!camera.current) return

    try {
      setIsRecording(true)
      const video = await camera.current.startRecording({
        onRecordingFinished: async (video) => {
          console.log('Recording finished:', video)
          setRecordedVideo(video)
          await uploadDrop(video)
          setIsRecording(false)
          // Open sound modal after recording is complete
          setVisible(true)
        },
        onRecordingError: (error) => {
          console.error('Recording error:', error)
          setIsRecording(false)
          Alert.alert('Recording Error', 'Failed to record video. Please try again.')
        },
      })
    } catch (error) {
      console.error('Start recording error:', error)
      setIsRecording(false)
      Alert.alert('Recording Error', 'Failed to start recording. Please try again.')
    }
  }

  const uploadDrop  = async()=>{
    console.log('drops/upload')
    const endPoint = "drops/upload"
    const data = {
      'temp-drops':'',
      'temp-drops-cover-images':''
    }
    const formData = createFormData(data)
    console.log('form', formData)
  }

  const stopRecording = async () => {
    if (!camera.current) return

    try {
      await camera.current.stopRecording()
    } catch (error) {
      console.error('Stop recording error:', error)
      setIsRecording(false)
    }
  }

  const toggleCameraPosition = () => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back')
    setIsCameraReady(false) // Reset camera ready state when switching
  }

  const handleAddSound = (soundId) => {
    setSelectedSound(soundId)
    console.log('Sound added to video:', soundId)
    // Close sound modal and open drop details modal
    setVisible(false)
    setDropDetailsVisible(true)
  }

  const handlePost = (dropData) => {
    console.log('Posting drop with data:', dropData)
    // Here you can implement the logic to post the drop
    Alert.alert('Success', 'Drop posted successfully!')
    setDropDetailsVisible(false)
    setSelectedSound(null)
    setRecordedVideo(null)
  }

  const handleDiscard = () => {
    setDropDetailsVisible(false)
    setSelectedSound(null)
    setRecordedVideo(null)
  }

  const handleCameraError = (error) => {
    console.error('Camera error:', error)
    setCameraError(error.message || 'Camera error occurred')
  }

  const handleCameraInitialized = () => {
    console.log('Camera initialized successfully')
    setIsCameraReady(true)
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={[Style.container, styles.permissionContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.permissionContent}>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            Fuugohub needs access to your camera and microphone to record videos.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // Check if devices are available
  if (!devices || Object.keys(devices).length === 0) {
    return (
      <SafeAreaView style={[Style.container, styles.loadingContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Initializing camera...</Text>
          <Text style={styles.debugText}>No camera devices detected</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => requestCameraPermission()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // Check if specific device is available
  if (!device) {
    return (
      <SafeAreaView style={[Style.container, styles.loadingContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Loading camera...</Text>
          <Text style={styles.debugText}>
            {cameraPosition} camera not available
          </Text>
          <Text style={styles.debugText}>
            Available: {Object.keys(devices).join(', ')}
          </Text>
          <Text style={styles.debugText}>
            Device positions: {Object.values(devices).map(d => d.position).join(', ')}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setCameraPosition('back')}
          >
            <Text style={styles.retryButtonText}>Try Back Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (cameraError) {
    return (
      <SafeAreaView style={[Style.container, styles.errorContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Camera Error</Text>
          <Text style={styles.errorText}>{cameraError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setCameraError(null)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[Style.container, styles.container]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Camera View */}
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={false}
        video={true}
        audio={true}
        onError={handleCameraError}
        onInitialized={handleCameraInitialized}
      />

      {/* Loading overlay if camera not ready */}
      {!isCameraReady && (
        <View style={styles.cameraLoadingOverlay}>
          <Text style={styles.cameraLoadingText}>Initializing camera...</Text>
        </View>
      )}

      {/* Top Controls */}
      <View style={styles.topControls}>
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>12:22</Text>
          <View style={styles.statusIcons}>
            <View style={styles.signalIcon} />
            <View style={styles.wifiIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
        
        <View style={styles.addSoundButton}>
          <Text style={styles.addSoundText}>🎵 Add sound</Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
            disabled={!isCameraReady}
          >
            <View style={styles.recordButtonInner} />
          </TouchableOpacity>
          <Text style={styles.cameraText}>Camera</Text>
          <View style={styles.cameraDot} />
        </View>
      </View>

      {/* Camera Flip Button */}
      <TouchableOpacity 
        style={styles.flipButton}
        onPress={toggleCameraPosition}
        disabled={!isCameraReady}
      >
        <Text style={styles.flipButtonText}>🔄</Text>
      </TouchableOpacity>

      {/* Add Sound Modal */}
      <AddSoundModal 
        visible={visible} 
        onClose={() => setVisible(false)} 
        onAddSound={handleAddSound}
      />

      {/* Drop Details Modal */}
      <DropDetailsModal
        visible={dropDetailsVisible}
        onClose={() => setDropDetailsVisible(false)}
        onPost={handlePost}
        selectedSound={selectedSound}
        recordedVideo={recordedVideo}
      />
    </SafeAreaView>
  )
}

export default DropVideoScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  camera: {
    width: width,
    height: height,
    position: 'absolute',
  },
  cameraLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  cameraLoadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 20,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalIcon: {
    width: 20,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  wifiIcon: {
    width: 16,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  addSoundButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addSoundText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    zIndex: 10,
  },
  recordButtonContainer: {
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  recordingButton: {
    backgroundColor: '#ff4444',
    borderColor: '#ff4444',
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4444',
  },
  cameraText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  cameraDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  flipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  flipButtonText: {
    fontSize: 20,
  },
  permissionContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  debugText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorTitle: {
    color: '#ff4444',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
})