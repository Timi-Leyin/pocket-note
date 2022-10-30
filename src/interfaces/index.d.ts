import { SyntheticEvent, MutableRefObject } from "react";

export interface BodyProps {
  title: string;
  children?: any;
}

export interface SaveProps {
  title:string;
  type?: "html"
  user_id:string;
  ref:MutableRefObject<HTMLDivElement>
}


export interface HeaderProps {
  title?: string;
  onTitleChange?:(e:SyntheticBEvent)=> void
}

export interface NoteProps {
  id: number;
  name: string;
  note: string;
  created_at: string;
}