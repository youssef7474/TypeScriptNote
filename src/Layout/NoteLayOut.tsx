import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../Navigations/Navigation";

type NoteLayOutProps = {
  notes: Note[];
};

const NoteLayOut = ({ notes }: NoteLayOutProps) => {
  const { id } = useParams();

  const note = notes.find((n) => n.id === id);

  if (note === null) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <>
      <Outlet context={note}></Outlet>
    </>
  );
};

export default NoteLayOut;


export function useNote(){
    return useOutletContext<Note>()
}
