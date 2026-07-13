import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Chip } from '../ui/Chip';
import { Navbar } from '../ui/Navbar';

type SetupScreenProps = {
  onStart: (data: any) => void;
};

export function SetupScreen({ onStart }: SetupScreenProps) {
  // Mock data para los catálogos (se podrían llenar luego desde la API)
  const [interviewTypes, setInterviewTypes] = useState<string[]>(['Técnica', 'Teórica']);
  const [jobRoles, setJobRoles] = useState<string[]>(['Frontend Developer', 'Backend Developer', 'Fullstack Developer']);
  const [seniorities, setSeniorities] = useState<string[]>(['Junior', 'Mid', 'Senior']);
  const [difficulties, setDifficulties] = useState<string[]>(['Baja', 'Media', 'Alta']);

  const [interviewType, setInterviewType] = useState(interviewTypes[0]);
  const [targetRole, setTargetRole] = useState(jobRoles[0]);
  const [seniority, setSeniority] = useState(seniorities[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Aquí iría el fetch real a los catálogos en el futuro:
    // fetch('/catalogs/interview-types').then(res => res.json()).then(setInterviewTypes);
  }, []);

  const handleAddTech = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tech = techInput.trim();
      if (tech && !technologies.includes(tech)) {
        setTechnologies([...technologies, tech]);
        setTechInput('');
      }
    }
  };

  const removeTech = (techToRemove: string) => {
    setTechnologies(technologies.filter(t => t !== techToRemove));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      interview_type: interviewType,
      target_role: targetRole,
      seniority,
      difficulty,
      technologies
    };

    try {
      // TODO: Reemplazar con el fetch real
      // const res = await fetch('/interviews', { method: 'POST', body: JSON.stringify(payload) });

      // Simulación de carga...
      await new Promise(resolve => setTimeout(resolve, 800));

      onStart(payload); // Pasamos a la siguiente pantalla
    } catch (err) {
      setError('Error de conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base overflow-auto">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <h1 className="font-mono font-bold text-2xl text-fg mb-6 uppercase border-b-2 border-ink pb-2">
            Configuración de Simulación
          </h1>

          {error && <div className="mb-4 p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Tipo de Entrevista"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
              >
                {interviewTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>

              <Select
                label="Rol Objetivo"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              >
                {jobRoles.map(r => <option key={r} value={r}>{r}</option>)}
              </Select>

              <Select
                label="Seniority"
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
              >
                {seniorities.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>

              <Select
                label="Dificultad"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Input
                label="Tecnologías (Presiona Enter para agregar)"
                placeholder="Ej: React, Node, Tailwind..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map(tech => (
                  <button type="button" key={tech} onClick={() => removeTech(tech)}>
                    <Chip tono="lila" className="cursor-pointer hover:bg-rojo transition-colors">
                      {tech} ✕
                    </Chip>
                  </button>
                ))}
                {technologies.length === 0 && (
                  <span className="font-mono text-xs text-muted">No se han agregado tecnologías.</span>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" variante="primario" disabled={loading}>
                {loading ? 'INICIANDO...' : 'INICIAR SIMULACIÓN'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
