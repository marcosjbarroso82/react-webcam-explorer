import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuración - React Webcam Explorer" },
    { name: "description", content: "Configuraciones de cámara y calidad para react-webcam" },
  ];
}

export default function Settings() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <div className="shadow-sm border-b px-4 py-4" style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderColor: 'var(--color-border)' 
      }}>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>⚙️ Configuración</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Ajustes de cámara y calidad</p>
      </div>

      {/* Camera Settings */}
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--color-text-primary)' }}>Configuración de Cámara</h2>
        
        {/* Resolution */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Resolución
          </label>
          <div className="space-y-2">
            {[
              { value: '640x480', label: '640x480 (VGA)', desc: 'Calidad estándar' },
              { value: '1280x720', label: '1280x720 (HD)', desc: 'Alta definición' },
              { value: '1920x1080', label: '1920x1080 (Full HD)', desc: 'Máxima calidad' }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border" style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)' 
              }}>
                <input 
                  type="radio" 
                  name="resolution" 
                  value={option.value}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {option.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {option.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Format */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Formato de Imagen
          </label>
          <div className="space-y-2">
            {[
              { value: 'jpeg', label: 'JPEG', desc: 'Compresión con pérdida' },
              { value: 'png', label: 'PNG', desc: 'Sin pérdida, mayor tamaño' },
              { value: 'webp', label: 'WebP', desc: 'Formato moderno' }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border" style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)' 
              }}>
                <input 
                  type="radio" 
                  name="format" 
                  value={option.value}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {option.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {option.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Settings */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>Configuración de Video</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border" style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Duración máxima
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Límite de tiempo para grabación
                </p>
              </div>
              <select className="px-3 py-1 rounded border text-sm" style={{ 
                backgroundColor: 'var(--color-background)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}>
                <option value="30">30 segundos</option>
                <option value="60">1 minuto</option>
                <option value="300">5 minutos</option>
                <option value="0">Sin límite</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="px-4">
        <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--color-text-primary)' }}>Configuración Avanzada</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border" style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Auto-focus
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Enfoque automático de la cámara
              </p>
            </div>
            <input 
              type="checkbox" 
              className="w-4 h-4"
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border" style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Estabilización
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Reducir vibración en videos
              </p>
            </div>
            <input 
              type="checkbox" 
              className="w-4 h-4"
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border" style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Guardar automáticamente
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Descargar archivos automáticamente
              </p>
            </div>
            <input 
              type="checkbox" 
              className="w-4 h-4"
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 mt-6">
        <button className="w-full py-3 rounded-lg font-medium" style={{ 
          backgroundColor: 'var(--color-accent)', 
          color: 'white' 
        }}>
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}