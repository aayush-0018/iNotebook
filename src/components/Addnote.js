import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const { updateAlert } = props;
  const context = useContext(noteContext);
  let { addNote } = context;
  let [notes, setNotes] = useState({ title: "", description: "", tag: "" });
  const handleChange = (e) => {
    e.preventDefault();
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    setNotes({ title: "", description: "", tag: "" });
    e.preventDefault();
    addNote(notes);
    updateAlert("Added a note", "success");
  };
  return (
    <form>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          aria-describedby="emailHelp"
          onChange={handleChange}
          value={notes.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={handleChange}
          value={notes.description}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={handleChange}
          value={notes.tag}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
  );
};

export default Addnote;
