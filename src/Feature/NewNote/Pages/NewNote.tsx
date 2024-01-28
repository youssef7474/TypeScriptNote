import { NoteData, Tag } from "../../../Navigations/Navigation"
import NoteForm from "../component/NoteForm"

type NewNoteProps={
  onSubmit:(data:NoteData)=>void,
  onAddTag:(tag:Tag)=>void,
  availableTags:Tag[]
}

const NewNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
  return (
    <div>
        <h1 className="mb-4">new note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </div>
  )
}

export default NewNote
