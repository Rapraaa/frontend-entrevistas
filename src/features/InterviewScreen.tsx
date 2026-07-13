import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';
import { Chip } from '../ui/Chip';
import { ChatPanel } from './ChatPanel';
import { EditorPanel } from './EditorPanel';

export function InterviewScreen() {
  return (
    <div className="flex flex-col h-screen bg-base">

      <Navbar>
        <Chip>MODO: TÉCNICA</Chip>
        <Chip tono="rojo">⏱ 04:58</Chip>
        <Avatar iniciales="RH" />
      </Navbar>

      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        <ChatPanel />
        <EditorPanel />
      </div>

    </div>
  );
}
