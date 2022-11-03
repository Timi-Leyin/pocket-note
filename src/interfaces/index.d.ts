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
  note: string;
  title:string;
  shared:string[];
  type:string;
  user_id:string;
  uuid:string;
  updated_at:string;
  created_at: string;
}