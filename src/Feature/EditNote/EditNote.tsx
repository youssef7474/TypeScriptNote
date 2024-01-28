import { useNote } from "../../Layout/NoteLayOut"
import { NoteData, Tag } from "../../Navigations/Navigation"
import NoteForm from "../NewNote/component/NoteForm"


type EditNoteProps={
  onSubmit:(id:string , data:NoteData)=>void,
  onAddTag:(tag:Tag)=>void,
  availableTags:Tag[]
}

const EditNote = ({onSubmit,onAddTag,availableTags}:EditNoteProps) => {
    const note=useNote()
  return (
    <div>
        <h1 className="mb-4">edit note</h1>
        <NoteForm 
            title={note.title}
            marDown={note.marDown}
            tags={note.tags}
            onSubmit={(data)=>onSubmit(note.id,data)}
            onAddTag={onAddTag} 
            availableTags={availableTags}
        />
    </div>
  )
}

export default EditNote
