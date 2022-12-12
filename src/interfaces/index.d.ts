import { SyntheticEvent, MutableRefObject } from "react";

export interface BodyProps {
  title: string;
  children?: any;
}
export type Action = "edit" | "new" | "read"
export interface SaveProps {
  title:string;
  type?: "html";
  shared:string[];
  action:Action;
  uuid:string;
  user_id?:string;
  ref:MutableRefObject<HTMLDivElement>
}


export interface HeaderProps {
  title?: string;
  id?:number;
  mock_title?:string;
  uuid?:string;
  isEditable?:boolean ;
  action?:Action;
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