import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
//para practica, no usar

export function PanelContexto() {
  return (
    <Card>
      <div className="flex flex-col gap-4">

        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono font-bold text-fg text-lg">Entrevistador IA </h2>
          <Chip tono="verde">● EN LÍNEA</Chip>
        </div>

        <div className="flex gap-2 flex-wrap">
           <Chip>BACKEND JR</Chip>
           <Chip>NESTJS</Chip>
           <Chip>TYPESCRIPT</Chip>
        </div>

        <Button>EMPEZAR</Button>

      </div>
    </Card>
  );
}
