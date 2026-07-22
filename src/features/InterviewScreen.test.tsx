import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { InterviewScreen } from './InterviewScreen';
import * as interviewsApi from '../lib/interviews';
import type { Interview } from '../lib/types';

const fakeInterview: Interview = {
  _id: '123',
  user_id: 'u1',
  config: {
    interview_type: 'Técnica',
    target_role: 'Backend',
    seniority: 'Junior',
    technologies: ['NestJS'],
  },
  status: 'in_progress',
  chat_history: [
    { sequence: 1, sender: 'ai', content: '¿Qué es la inyección de dependencias?' },
  ],
};

function renderScreen() {
  return render(
    <MemoryRouter initialEntries={['/interview/123']}>
      <Routes>
        <Route path="/interview/:id" element={<InterviewScreen />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('InterviewScreen', () => {
  beforeEach(() => {
    vi.spyOn(interviewsApi, 'getInterview').mockResolvedValue(fakeInterview);
  });

  it('renderiza el encabezado de la entrevista técnica', async () => {
    renderScreen();

    expect(
      await screen.findByRole('heading', { name: /entrevista técnica/i }),
    ).toBeInTheDocument();
  });

  it('abre el editor en el lenguaje deducido de las tecnologías', async () => {
    renderScreen();

    expect(await screen.findByText('solucion.ts')).toBeInTheDocument();
    expect(screen.getByText('notas.md')).toBeInTheDocument();
  });
});
