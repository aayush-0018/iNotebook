import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Notesitem = (props) => {
  let { note, updateNote, updateAlert } = props;
  const context = useContext(noteContext);
  let { deleteNote } = context;
  const handleClick = (e) => {
    e.preventDefault();
    deleteNote(note._id);
    updateAlert("Deleted the note", "success");
  };
  const handleUpdateClick = () => {
    updateNote(note);
  };
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div className="p-2">
              <i
                className="fa-solid fa-pen-to-square"
                onClick={handleUpdateClick}
              ></i>
            </div>
            <div className="p-2">
              <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
            </div>
          </div>
          <p className="card-text mx-2">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
