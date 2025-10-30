import { React, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notesitem from "./Notesitem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  let { notes, getNotes, editNote } = context;
  let [modalNote, setModalNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const updateNote = (note) => {
    // console.log("hi");
    // console.log(ref.current);
    ref1.current.click();
    setModalNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setModalNote({ ...modalNote, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    ref2.current.click();
    e.preventDefault();
    editNote(modalNote);
    props.updateAlert("Updated the note", "success");
  };

  useEffect((e) => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      getNotes();
    }
  }, []);

  return (
    <>
      {/* Button trigger modal */}
      <button
        ref={ref1}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    value={modalNote.title}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    value={modalNote.description}
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={modalNote.tag}
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={ref2}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes part */}
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <Notesitem
              key={note._id}
              note={note}
              updateNote={updateNote}
              updateAlert={props.updateAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
