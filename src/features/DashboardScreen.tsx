import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';

export function DashboardScreen() {
  const navigate = useNavigate();

  // Mock data para las métricas globales
  const metrics = {
    totalSimulations: 12,
    averageScore: 85,
    bestScore: 98,
    streak: 3
  };

  // Mock data para el historial reciente
  const recentHistory = [
    { id: 1, role: 'Frontend Developer', date: '2026-07-16', score: 90, difficulty: 'Media' },
    { id: 2, role: 'Backend Developer', date: '2026-07-14', score: 78, difficulty: 'Alta' },
    { id: 3, role: 'Fullstack Developer', date: '2026-07-10', score: 88, difficulty: 'Baja' },
  ];

  return (
    <div className="flex flex-col h-screen bg-base overflow-auto">
      <Navbar>
        <Avatar iniciales="CD" />
      </Navbar>
      
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col gap-8">
        
        {/* Encabezado y botón principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-ink pb-4">
          <div>
            <h1 className="font-mono font-bold text-3xl text-fg uppercase">Mi Dashboard</h1>
            <p className="font-mono text-sm text-muted">Resumen de tus entrevistas de simulación.</p>
          </div>
          {/* Navegamos a la configuración ("/setup") al hacer clic */}
          <Button variante="primario" onClick={() => navigate('/setup')}>
            NUEVA SIMULACIÓN
          </Button>
        </div>

        {/* Sección de Métricas Globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Simulaciones</h3>
            <p className="font-mono text-3xl font-bold text-fg">{metrics.totalSimulations}</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Promedio</h3>
            <p className="font-mono text-3xl font-bold text-verde">{metrics.averageScore}</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Mejor Puntaje</h3>
            <p className="font-mono text-3xl font-bold text-lila">{metrics.bestScore}</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Racha (Días)</h3>
            <p className="font-mono text-3xl font-bold text-rojo">🔥 {metrics.streak}</p>
          </Card>
        </div>

        {/* Sección de Historial Reciente */}
        <div>
          <h2 className="font-mono font-bold text-xl text-fg uppercase mb-4">Historial Reciente</h2>
          <Card className="p-0 overflow-hidden">
            {recentHistory.length === 0 ? (
              <div className="p-6 text-center font-mono text-muted">No hay simulaciones recientes.</div>
            ) : (
              <div className="flex flex-col">
                {recentHistory.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 ${index !== recentHistory.length - 1 ? 'border-b-2 border-ink' : ''}`}
                  >
                    <div className="flex flex-col mb-2 md:mb-0">
                      <span className="font-mono font-bold text-fg text-lg">{item.role}</span>
                      <span className="font-mono text-xs text-muted">{item.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Mapeamos el color del Chip según la dificultad */}
                      <Chip tono={item.difficulty === 'Alta' ? 'rojo' : item.difficulty === 'Media' ? 'lila' : 'verde'}>
                        {item.difficulty}
                      </Chip>
                      <div className="font-mono font-bold text-lg text-fg w-12 text-right">
                        {item.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
