import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';

export function ResultScreen() {
  const navigate = useNavigate();

  // Mock data temporal para visualizar la estructura del reporte
  const reportData = {
    finalScore: 82,
    feedback: "Tuviste un buen desempeño en general. Demostraste un dominio sólido en los fundamentos de React, pero hubo dudas considerables al hablar de optimización y hooks avanzados como useMemo o useCallback. Te sugiero repasar esos conceptos para tu próxima entrevista.",
    categories: [
      { name: 'Fundamentos Web', score: 95 },
      { name: 'Resolución de problemas', score: 80 },
      { name: 'Optimización y Rendimiento', score: 60 }
    ],
    questions: [
      { id: 1, question: "¿Qué es el Virtual DOM y cómo funciona?", correct: true, points: 20 },
      { id: 2, question: "¿Cómo optimizarías el re-renderizado de un componente pesado?", correct: false, points: 0 },
      { id: 3, question: "Diferencia principal entre useEffect y useLayoutEffect", correct: true, points: 15 },
    ]
  };

  // Función temporal simulando la descarga
  const handlePrint = () => {
    window.print(); // Solución nativa rápida para el MVP
  };

  return (
    <div className="flex flex-col h-screen bg-base overflow-auto">
      <Navbar>
        <Avatar iniciales="CD" />
      </Navbar>
      
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-ink pb-4">
          <h1 className="font-mono font-bold text-3xl text-fg uppercase">Reporte de Simulación</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta Destacada de Puntaje Final */}
          <Card className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-surface2">
            <h3 className="font-mono text-sm text-muted font-bold uppercase mb-4">Puntaje Final</h3>
            <span className={`font-mono text-7xl font-bold ${reportData.finalScore >= 80 ? 'text-verde' : reportData.finalScore >= 60 ? 'text-naranja' : 'text-rojo'}`}>
              {reportData.finalScore}
            </span>
            <span className="font-mono text-sm text-fg mt-4 font-bold uppercase tracking-widest">sobre 100</span>
          </Card>

          {/* Feedback y Categorías */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Feedback General (Texto de IA) */}
            <Card>
              <h3 className="font-mono text-sm text-fg font-bold uppercase mb-2 border-b-2 border-ink inline-block pb-1">
                Feedback General de IA
              </h3>
              <p className="font-mono text-sm text-fg leading-relaxed mt-2">
                {reportData.feedback}
              </p>
            </Card>

            {/* Desempeño por Categoría */}
            <Card>
              <h3 className="font-mono text-sm text-fg font-bold uppercase mb-4">
                Desempeño por Categoría
              </h3>
              <div className="flex flex-col gap-3">
                {reportData.categories.map(cat => (
                  <div key={cat.name} className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                    <span className="font-mono text-sm text-fg">{cat.name}</span>
                    <Chip tono={cat.score >= 80 ? 'verde' : cat.score >= 60 ? 'lila' : 'rojo'}>
                      {cat.score}/100
                    </Chip>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Desglose por Pregunta individual */}
        <Card className="p-0 overflow-hidden mt-2">
          <div className="p-4 bg-surface2 border-b-2 border-ink">
            <h3 className="font-mono text-sm text-fg font-bold uppercase">Desglose por Pregunta</h3>
          </div>
          <div className="flex flex-col">
            {reportData.questions.map((q, index) => (
              <div key={q.id} className={`flex justify-between items-center p-4 ${index !== reportData.questions.length - 1 ? 'border-b-2 border-ink' : ''}`}>
                <span className="font-mono text-sm text-fg flex-1 mr-4">{q.question}</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted font-bold uppercase w-16 text-right">
                    {q.points} pts
                  </span>
                  <Chip tono={q.correct ? 'verde' : 'rojo'} className="w-28 justify-center">
                    {q.correct ? '✓ CORRECTO' : '✗ ERROR'}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Botones de Acción Múltiple */}
        <div className="flex flex-wrap justify-end gap-4 mt-2 mb-8">
          <Button variante="secundario" onClick={handlePrint}>
            DESCARGAR PDF
          </Button>
          <Button variante="secundario" onClick={() => navigate('/')}>
            VOLVER AL DASHBOARD
          </Button>
          <Button variante="primario" onClick={() => navigate('/setup')}>
            REPETIR SIMULACIÓN
          </Button>
        </div>

      </div>
    </div>
  );
}
