export interface BodyProps {
  title: string;
  children?: any;
}


export interface HeaderProps {
  title?: string;
}

export interface NoteProps {
  id: number;
  name: string;
  note: string;
  created_at: string;
}