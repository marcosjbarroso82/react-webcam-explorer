# React Webcam Explorer

Un proyecto de exploración de la librería `react-webcam` para aprender y experimentar con funcionalidades de cámara web en React.

## 🎯 Objetivo

Este proyecto sirve como un laboratorio para explorar las capacidades de `react-webcam`, incluyendo:
- Captura de fotos y videos
- Diferentes configuraciones de cámara
- Formatos de imagen y video
- Controles de calidad y resolución
- Integración con APIs del navegador

## 🚀 Características

- 📷 **Camera**: Vista principal con cámara en vivo
- 🖼️ **Gallery**: Galería de fotos y videos capturados
- ⚙️ **Settings**: Configuraciones de cámara y calidad
- ℹ️ **About**: Documentación y ejemplos de uso

## 🛠️ Tecnologías

- React 19
- React Router 7
- TypeScript
- TailwindCSS
- react-webcam (por instalar)

## 📦 Instalación

### Dependencias base
```bash
npm install
```

### Instalar react-webcam
```bash
npm install react-webcam
```

## 🚀 Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## 🏗️ Construcción

Crear build de producción:

```bash
npm run build
```

## 📱 Estructura del Proyecto

```
app/
├── components/
│   └── BottomNavigation.tsx    # Navegación inferior
├── contexts/
│   └── ThemeContext.tsx        # Contexto de tema
├── routes/
│   ├── camera.tsx              # Página principal de cámara
│   ├── gallery.tsx             # Galería de capturas
│   ├── settings.tsx            # Configuraciones
│   └── about.tsx               # Información del proyecto
└── root.tsx                    # Componente raíz
```

## 🎨 Funcionalidades Planificadas

- [ ] Captura de fotos con diferentes formatos
- [ ] Grabación de videos
- [ ] Configuración de resolución y calidad
- [ ] Filtros y efectos básicos
- [ ] Descarga de archivos
- [ ] Integración con APIs de almacenamiento

## 📚 Recursos

- [react-webcam Documentation](https://github.com/mozmorris/react-webcam)
- [React Router Documentation](https://reactrouter.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

Construido con ❤️ para explorar react-webcam.