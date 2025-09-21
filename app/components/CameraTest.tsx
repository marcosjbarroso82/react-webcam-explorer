import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface CameraSettings {
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
  forceScreenshotSourceSize: boolean;
  screenshotQuality: number;
  screenshotFormat: string;
  imageSmoothing: boolean;
}

interface CameraTestProps {
  className?: string;
}

export default function CameraTest({ className = '' }: CameraTestProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<{
    format: string;
    dimensions: string;
    size: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusDelay, setFocusDelay] = useState(1); // segundos
  const [cameraInfo, setCameraInfo] = useState<{
    capabilities: MediaTrackCapabilities | null;
    settings: MediaTrackSettings | null;
    constraints: MediaTrackConstraints | null;
  }>({
    capabilities: null,
    settings: null,
    constraints: null
  });

  // Configuración inicial
  const [settings, setSettings] = useState<CameraSettings>({
    videoConstraints: {
      width: 1920,
      height: 1080,
      facingMode: 'environment'
    },
    forceScreenshotSourceSize: true,
    screenshotQuality: 0.9,
    screenshotFormat: 'image/jpeg',
    imageSmoothing: false
  });

  // Configuración de video constraints para react-webcam
  const videoConstraints = {
    width: settings.videoConstraints.width,
    height: settings.videoConstraints.height,
    facingMode: settings.videoConstraints.facingMode as 'user' | 'environment'
  };

  const getCameraInfo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: videoConstraints 
      });
      const videoTrack = stream.getVideoTracks()[0];
      
      if (videoTrack) {
        const capabilities = videoTrack.getCapabilities();
        const settings = videoTrack.getSettings();
        const constraints = videoTrack.getConstraints();
        
        setCameraInfo({
          capabilities,
          settings,
          constraints
        });
        
        // Detener el stream temporal para obtener la info
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err) {
      console.error('Error getting camera info:', err);
    }
  }, [videoConstraints]);

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Aplicar delay de enfoque
      await new Promise(resolve => setTimeout(resolve, focusDelay * 1000));

      const imageSrc = webcamRef.current.getScreenshot({
        width: settings.videoConstraints.width,
        height: settings.videoConstraints.height,
        screenshotFormat: settings.screenshotFormat as 'image/jpeg' | 'image/png',
        screenshotQuality: settings.screenshotQuality,
        imageSmoothing: settings.imageSmoothing
      });

      if (imageSrc) {
        setCapturedImage(imageSrc);
        
        // Calcular información de la imagen
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Obtener tamaño del archivo
            const dataURL = canvas.toDataURL(settings.screenshotFormat, settings.screenshotQuality);
            const sizeInBytes = Math.round((dataURL.length - 22) * 3 / 4); // Aproximación del tamaño en bytes
            
            setImageInfo({
              format: settings.screenshotFormat,
              dimensions: `${img.width} x ${img.height}`,
              size: sizeInBytes > 1024 ? `${(sizeInBytes / 1024).toFixed(1)} KB` : `${sizeInBytes} bytes`
            });
          }
        };
        img.src = imageSrc;
      }
    } catch (err) {
      setError('Error al capturar la imagen');
      console.error('Error capturing image:', err);
    } finally {
      setIsLoading(false);
    }
  }, [settings, focusDelay]);

  const handleSettingChange = (key: keyof CameraSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleVideoConstraintChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      videoConstraints: {
        ...prev.videoConstraints,
        [key]: value
      }
    }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Información de la cámara */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Información de la Cámara
          </h3>
          <button
            onClick={getCameraInfo}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Actualizar Info
          </button>
        </div>
        
        {cameraInfo.capabilities ? (
          <div className="space-y-4">
            {/* Resolución soportada */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Resoluciones Soportadas</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Ancho:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.width?.min} - {cameraInfo.capabilities.width?.max} px
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Alto:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.height?.min} - {cameraInfo.capabilities.height?.max} px
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuración actual */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Configuración Actual</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Resolución:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.settings?.width} x {cameraInfo.settings?.height}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Cámara:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.settings?.facingMode === 'environment' ? 'Trasera' : 'Frontal'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">FPS:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.settings?.frameRate || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Dispositivo:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.settings?.deviceId ? 'ID: ' + cameraInfo.settings.deviceId.substring(0, 8) + '...' : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacidades adicionales */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Capacidades Adicionales</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Zoom:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.zoom ? 'Soportado' : 'No soportado'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Enfoque:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.focusMode ? 'Soportado' : 'No soportado'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Balance de Blancos:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.whiteBalanceMode ? 'Soportado' : 'No soportado'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Exposición:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {cameraInfo.capabilities.exposureMode ? 'Soportado' : 'No soportado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Haz clic en "Actualizar Info" para obtener información de la cámara
            </p>
            <button
              onClick={getCameraInfo}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Obtener Información
            </button>
          </div>
        )}
      </div>

      {/* Configuración de la cámara */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Configuración de la Cámara
        </h3>
        
        <div className="space-y-4">
          {/* Video Constraints */}
          <div>
            <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Video Constraints</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Ancho
                </label>
                <input
                  type="number"
                  value={settings.videoConstraints.width}
                  onChange={(e) => handleVideoConstraintChange('width', parseInt(e.target.value) || 1920)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Alto
                </label>
                <input
                  type="number"
                  value={settings.videoConstraints.height}
                  onChange={(e) => handleVideoConstraintChange('height', parseInt(e.target.value) || 1080)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Cámara
                </label>
                <select
                  value={settings.videoConstraints.facingMode}
                  onChange={(e) => handleVideoConstraintChange('facingMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="environment">Trasera (environment)</option>
                  <option value="user">Frontal (user)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Otras configuraciones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Force Screenshot Source Size
              </label>
              <input
                type="checkbox"
                checked={settings.forceScreenshotSourceSize}
                onChange={(e) => handleSettingChange('forceScreenshotSourceSize', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Image Smoothing (mantener bordes definidos)
              </label>
              <input
                type="checkbox"
                checked={settings.imageSmoothing}
                onChange={(e) => handleSettingChange('imageSmoothing', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Calidad de Captura (0.1 - 1.0)
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={settings.screenshotQuality}
                onChange={(e) => handleSettingChange('screenshotQuality', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {settings.screenshotQuality}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Formato de Imagen
              </label>
              <select
                value={settings.screenshotFormat}
                onChange={(e) => handleSettingChange('screenshotFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Delay de Enfoque (segundos)
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={focusDelay}
                onChange={(e) => setFocusDelay(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {focusDelay} segundos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vista previa de la cámara */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Vista Previa
        </h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="relative">
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: '60vh' }}
            onUserMediaError={(error) => {
              setError('Error al acceder a la cámara. Verifica los permisos.');
              console.error('Webcam error:', error);
            }}
          />
          
          {/* Overlay de loading */}
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Enfocando...</p>
              </div>
            </div>
          )}
        </div>

        {/* Botón de captura */}
        <div className="mt-4 text-center">
          <button
            onClick={capture}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Enfocando...' : 'Tomar Foto'}
          </button>
        </div>
      </div>

      {/* Imagen capturada */}
      {capturedImage && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Foto Capturada
          </h3>
          
          <div className="space-y-4">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-auto rounded-lg"
              style={{ maxHeight: '60vh' }}
            />
            
            {imageInfo && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">
                  Información de la Imagen
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Formato:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{imageInfo.format}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Dimensiones:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{imageInfo.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Tamaño:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{imageInfo.size}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
