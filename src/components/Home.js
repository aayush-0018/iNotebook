import { React } from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <>
      <Addnote updateAlert={props.updateAlert} />
      <Notes updateAlert={props.updateAlert} />
    </>
  );
};

export default Home;
