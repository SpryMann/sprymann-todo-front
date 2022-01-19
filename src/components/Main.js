import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Collection from "./Collection";
import Form from "./Form";

const Main = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="main">{user.isLogged ? <Collection /> : <Form />}</div>
  );
});

export default Main;
