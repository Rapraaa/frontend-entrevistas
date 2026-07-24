import { useState, useEffect } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Chip } from '../ui/Chip';
import { getCatalog, createInterview } from '../lib/interviews';
import { listTechnologies } from '../lib/catalogs';
import { ApiError } from '../lib/api';
import { etiqueta } from '../lib/etiquetas';

const FALLBACK = {
  types: ['Técnica', 'Teórica'],
  roles: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  seniorities: ['Junior', 'Mid', 'Senior'],
};

export function SetupScreen() {
  const navigate = useNavigate();

  const [interviewTypes, setInterviewTypes] = useState<string[]>(FALLBACK.types);
  const [jobRoles, setJobRoles] = useState<string[]>(FALLBACK.roles);
  const [seniorities, setSeniorities] = useState<string[]>(FALLBACK.seniorities);

  const [interviewType, setInterviewType] = useState(FALLBACK.types[0]);
  const [targetRole, setTargetRole] = useState(FALLBACK.roles[0]);
  const [seniority, setSeniority] = useState(FALLBACK.seniorities[0]);

  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [sugerencias, setSugerencias] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [catalogoCaido, setCatalogoCaido] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [types, roles, levels] = await Promise.all([
          getCatalog('interview-types'),
          getCatalog('job-roles'),
          getCatalog('seniority-levels'),
        ]);
        if (types.data.length) {
          const names = types.data.map((c) => c.name);
          setInterviewTypes(names);
          setInterviewType(names[0]);
        }
        if (roles.data.length) {
          const names = roles.data.map((c) => c.name);
          setJobRoles(names);
          setTargetRole(names[0]);
        }
        if (levels.data.length) {
          const names = levels.data.map((c) => c.name);
          setSeniorities(names);
          setSeniority(names[0]);
        }
      } catch {
        setCatalogoCaido(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    listTechnologies()
      .then((res) => setSugerencias(res.data.map((t) => t.name)))
      .catch(() => setSugerencias([]));
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
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (technologies.length === 0) {
      setError('Agrega al menos una tecnología.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const interview = await createInterview({
        interview_type: interviewType,
        target_role: targetRole,
        seniority,
        technologies,
      });
      navigate(`/interview/${interview._id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error de conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="w-full">
          <h1 className="font-mono font-bold text-2xl text-fg mb-6 uppercase border-b-2 border-trazo pb-2">
            Configuración de Simulación
          </h1>

          {catalogoCaido && (
            <div className="mb-4 p-3 border-2 border-trazo bg-amarillo text-ink font-mono text-sm font-bold">
              No se pudo cargar el catálogo del servidor. Estás viendo las opciones por defecto.
            </div>
          )}

          {error && (
            <div role="alert" className="mb-4 p-3 border-2 border-trazo bg-rojo text-ink font-mono font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select label="Tipo de Entrevista" value={interviewType} onChange={(e) => setInterviewType(e.target.value)}>
                {interviewTypes.map((t) => <option key={t} value={t}>{etiqueta(t)}</option>)}
              </Select>

              <Select label="Rol Objetivo" value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
                {jobRoles.map((r) => <option key={r} value={r}>{etiqueta(r)}</option>)}
              </Select>

              <Select label="Seniority" value={seniority} onChange={(e) => setSeniority(e.target.value)}>
                {seniorities.map((s) => <option key={s} value={s}>{etiqueta(s)}</option>)}
              </Select>

            </div>

            <div className="flex flex-col gap-2">
              <Input
                label="Tecnologías (Presiona Enter para agregar)"
                placeholder="Ej: React, Node, Tailwind..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                list="sugerencias-tecnologias"
                autoComplete="off"
              />
              <datalist id="sugerencias-tecnologias">
                {sugerencias.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech) => (
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

            <div className="border-2 border-trazo bg-surface2 p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                Lo que vas a practicar
              </p>
              <p className="font-mono text-sm text-fg">
                Entrevista <strong>{etiqueta(interviewType)}</strong> para{' '}
                <strong>{etiqueta(targetRole)}</strong> nivel <strong>{etiqueta(seniority)}</strong>
                {technologies.length > 0 && (
                  <> sobre <strong>{technologies.join(', ')}</strong></>
                )}
                .
              </p>
              <p className="font-mono text-xs text-muted mt-2">
                Unas 10 preguntas, alrededor de 15 minutos. Puedes guardar y salir cuando quieras.
              </p>
            </div>

            <div className="mt-2">
              <Button type="submit" variante="primario" className="w-full" disabled={loading}>
                {loading ? 'INICIANDO...' : 'INICIAR SIMULACIÓN'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
