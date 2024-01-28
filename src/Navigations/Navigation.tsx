import { Route, Routes } from "react-router-dom";
import NewNote from "../Feature/NewNote/Pages/NewNote";
import { routes } from "./Routes";
import LayOut from "../Layout/LayOut";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import HomePage from "../Feature/home/pages/HomePage";
import NoteLayOut from "../Layout/NoteLayOut";
import NoteDetails from "../Feature/NoteDetails/NoteDetails";
import EditNote from "../Feature/EditNote/EditNote";

export type RowNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markDown: string;
  tagsIds: string[];
};

export type NoteData = {
  title: string;
  marDown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

const Navigation = () => {
  const [notes, SetNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const [tags, SetTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    SetNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }


  function UpdateNote(id:string,{tags,...data}:NoteData){
    SetNotes(PrevNote=>{
      return PrevNote.map(note=>{
        if (note.id===id){
          return{...note,...data,tagsIds:tags.map((el)=>(el.id))}
        }else{
          return note
        }
      })
    })
  }


  function onDeleteNote(id:string){
    SetNotes(prevNote=>{
      return prevNote.filter(note=>note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    SetTags((prev) => [...prev, tag]);
  }


  function UpdateTag(id:string,label:string){
    SetTags(PrevTag=>{
      return PrevTag.map((tag)=>{
        if (tag.id===id){
          return {...tag,label}
        }else{
          return tag
        }
      })
    })
  }

  function DeleteTag(id:string){
    SetTags(prevTag=>{
      return prevTag.filter(tag=>tag.id!==id)
    })
  }

  return (
    <Routes>
      <Route element={<LayOut></LayOut>}>
        <Route
          path="/"
          element={<HomePage notes={notesWithTags} availableTags={tags} DeleteTag={DeleteTag} UpdateTag={UpdateTag} />}
        />
        <Route
          path={routes.new}
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayOut notes={notesWithTags}/>}>
          <Route index element={<NoteDetails onDeleteNote={onDeleteNote}/> }></Route>
          <Route path="edit" element={<EditNote onSubmit={UpdateNote} availableTags={tags} onAddTag={addTag}/>}></Route>
        </Route>
      </Route>
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
};

export default Navigation;
