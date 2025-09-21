# React Webcam Explorer

Un proyecto completo de exploración de la librería `react-webcam` para aprender y experimentar con funcionalidades avanzadas de cámara web en React. Este proyecto está especialmente diseñado para captura de pantallas de notebook con celular para posterior procesamiento OCR.

## 🎯 Objetivo

Este proyecto sirve como un laboratorio completo para explorar las capacidades de `react-webcam`, incluyendo:
- Captura de fotos con configuración avanzada
- Diferentes configuraciones de cámara y calidad
- Formatos de imagen (JPEG/PNG) con control de calidad
- Controles de resolución y parámetros de video
- Información detallada de la cámara y capacidades
- Interfaz responsive optimizada para móviles
- Configuración persistente en localStorage

## 🚀 Características Implementadas

### 📷 **Página de Cámara** (`/`)
- **Vista previa en tiempo real** de la cámara con configuración personalizable
- **Captura de fotos** con delay de enfoque configurable
- **Información detallada de la cámara** incluyendo:
  - Resoluciones soportadas (ancho/alto)
  - Configuración actual (resolución, cámara, FPS, dispositivo)
  - Capacidades adicionales (zoom, enfoque, balance de blancos, exposición)
- **Configuración avanzada** de parámetros:
  - Resolución de video (ancho x alto)
  - Cámara frontal/trasera (facingMode)
  - Force Screenshot Source Size
  - Image Smoothing (para mantener bordes definidos)
  - Calidad de captura (0.1 - 1.0)
  - Formato de imagen (JPEG/PNG)
  - Delay de enfoque (0-5 segundos)
- **Información de imagen capturada**:
  - Formato de la imagen
  - Dimensiones (ancho x alto)
  - Tamaño del archivo en bytes/KB
- **Manejo de errores** con mensajes informativos
- **Optimizado para OCR** con configuración específica para captura de pantallas

### 🖼️ **Galería** (`/gallery`)
- Interfaz preparada para mostrar fotos y videos capturados
- Diseño responsive con grid de imágenes
- Estado vacío con instrucciones de uso
- Funcionalidades planificadas documentadas

### ⚙️ **Configuración** (`/settings`)
- **Configuración de cámara** completa con todos los parámetros
- **Configuración avanzada** adicional:
  - Auto-focus
  - Estabilización
  - Guardado automático
- **Persistencia** de configuraciones en localStorage
- **Botón de restablecimiento** a valores por defecto

### ℹ️ **Acerca de** (`/about`)
- Información completa del proyecto
- Documentación sobre react-webcam
- Guía de instalación
- Lista de funcionalidades a explorar
- Enlaces a recursos útiles

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **React Router 7** - Enrutamiento
- **TypeScript** - Tipado estático
- **TailwindCSS 4** - Estilos y diseño responsive
- **react-webcam 7.2.0** - Funcionalidad de cámara web
- **Vite** - Herramienta de construcción
- **gh-pages** - Despliegue en GitHub Pages

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- Navegador moderno con soporte para WebRTC
- Cámara web o dispositivo móvil con cámara

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd react-webcam-explorer

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Construcción
npm run build        # Crear build de producción
npm run start        # Servir build de producción

# Despliegue
npm run predeploy    # Ejecutar build antes del despliegue
npm run deploy       # Desplegar a GitHub Pages

# Utilidades
npm run typecheck    # Verificar tipos de TypeScript
```

## 📱 Estructura del Proyecto

```
app/
├── components/
│   ├── BottomNavigation.tsx      # Navegación inferior fija
│   ├── CameraSettings.tsx        # Componente de configuración de cámara
│   └── CameraTest.tsx           # Componente principal de prueba de cámara
├── contexts/
│   ├── CameraSettingsContext.tsx # Contexto global para configuración de cámara
│   └── ThemeContext.tsx         # Contexto de tema (claro/oscuro)
├── routes/
│   ├── camera.tsx               # Página principal de cámara (/)
│   ├── gallery.tsx              # Galería de capturas (/gallery)
│   ├── settings.tsx             # Configuraciones (/settings)
│   └── about.tsx                # Información del proyecto (/about)
├── app.css                      # Estilos globales y variables CSS
└── root.tsx                     # Componente raíz de la aplicación
```

## ⚙️ Configuración de Cámara

### Parámetros Principales

| Parámetro | Descripción | Valores | Por Defecto |
|-----------|-------------|---------|-------------|
| `width` | Ancho de resolución | Número | 1920 |
| `height` | Alto de resolución | Número | 1080 |
| `facingMode` | Cámara a usar | 'environment' \| 'user' | 'environment' |
| `forceScreenshotSourceSize` | Forzar tamaño de captura | boolean | true |
| `screenshotQuality` | Calidad de imagen | 0.1 - 1.0 | 0.9 |
| `screenshotFormat` | Formato de imagen | 'image/jpeg' \| 'image/png' | 'image/jpeg' |
| `imageSmoothing` | Suavizado de imagen | boolean | false |
| `focusDelay` | Delay de enfoque (seg) | 0 - 5 | 1 |

### Configuración Recomendada para OCR

Para obtener mejores resultados en captura de pantallas para OCR:

```javascript
{
  videoConstraints: {
    width: 1920,
    height: 1080,
    facingMode: 'environment'
  },
  forceScreenshotSourceSize: true,
  screenshotQuality: 0.9,
  screenshotFormat: 'image/jpeg',
  imageSmoothing: false,  // Mantiene bordes definidos
  focusDelay: 1.5
}
```

## 🎨 Funcionalidades Implementadas

### ✅ Completadas
- [x] Captura de fotos con diferentes formatos (JPEG/PNG)
- [x] Configuración completa de resolución y calidad
- [x] Información detallada de la cámara y capacidades
- [x] Configuración persistente en localStorage
- [x] Interfaz responsive optimizada para móviles
- [x] Manejo de errores y permisos de cámara
- [x] Delay de enfoque configurable
- [x] Optimización para captura de pantallas (OCR)

### 🔄 En Desarrollo
- [ ] Grabación de videos
- [ ] Galería funcional con almacenamiento local
- [ ] Descarga automática de archivos
- [ ] Filtros y efectos básicos

### 📋 Planificadas
- [ ] Integración con APIs de almacenamiento en la nube
- [ ] Procesamiento de imágenes básico
- [ ] Compartir archivos
- [ ] Modo de captura por lotes

## 🚀 Despliegue

### GitHub Pages
El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

```bash
npm run deploy
```

### Docker
Incluye `Dockerfile` para despliegue en contenedores:

```bash
docker build -t react-webcam-explorer .
docker run -p 3000:3000 react-webcam-explorer
```

## 🔧 Desarrollo

### Estructura de Contextos

El proyecto utiliza React Context para manejar el estado global:

- **CameraSettingsContext**: Gestiona toda la configuración de la cámara
- **ThemeContext**: Maneja el tema claro/oscuro de la aplicación

### Estilos

Utiliza variables CSS personalizadas para el sistema de colores:

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-accent: #3b82f6;
  --color-border: #e5e7eb;
}
```

## 📱 Compatibilidad

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Dispositivos**: Desktop, tablet, móvil
- **Cámaras**: Webcam USB, cámara frontal/trasera de móviles
- **Resoluciones**: Soporte para múltiples resoluciones según dispositivo

## 🐛 Solución de Problemas

### Cámara no funciona
1. Verificar permisos del navegador
2. Asegurar que no hay otras aplicaciones usando la cámara
3. Probar en modo incógnito
4. Verificar que la URL sea HTTPS (requerido para WebRTC)

### Calidad de imagen baja
1. Ajustar `screenshotQuality` a 1.0
2. Aumentar resolución en `videoConstraints`
3. Activar `forceScreenshotSourceSize`
4. Desactivar `imageSmoothing` para bordes más definidos

### Problemas de rendimiento
1. Reducir resolución de video
2. Ajustar `screenshotQuality`
3. Verificar recursos del dispositivo

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Construido con ❤️ para explorar react-webcam y facilitar la captura de pantallas para OCR.**