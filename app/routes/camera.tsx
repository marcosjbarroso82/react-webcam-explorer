import type { Route } from "./+types/camera";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cámara - React Webcam Explorer" },
    { name: "description", content: "Página principal para explorar funcionalidades de react-webcam" },
  ];
}

export default function Camera() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <div className="shadow-sm border-b px-4 py-4" style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderColor: 'var(--color-border)' 
      }}>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>📷 Cámara</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Explora react-webcam</p>
      </div>

      {/* Camera Placeholder */}
      <div className="p-4">
        <div className="rounded-lg border-2 border-dashed p-8 text-center" style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Cámara Web</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Aquí se mostrará el componente de react-webcam una vez instalado
          </p>
          <div className="text-xs px-3 py-1 rounded-full inline-block" style={{ 
            backgroundColor: 'var(--color-accent)', 
            color: 'white' 
          }}>
            Próximamente
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>Acciones Rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg p-4 shadow-sm border" style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#10b981' }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <h3 className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Tomar Foto</h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Capturar imagen</p>
          </div>
          
          <div className="rounded-lg p-4 shadow-sm border" style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#ef4444' }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Grabar Video</h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Iniciar grabación</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>Instrucciones</h2>
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Instala react-webcam: <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--color-surface)' }}>npm install react-webcam</code>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Configura permisos de cámara en tu navegador
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Explora las diferentes funcionalidades en las otras páginas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
