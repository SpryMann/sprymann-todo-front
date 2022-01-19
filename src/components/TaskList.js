import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Task from "./Task";

const TaskList = observer(({ title, status }) => {
  const { tasks } = useContext(Context);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tasks.tasks.filter((task) => task.status === status));
  }, [tasks.tasks]);

  if (data.length) {
    return (
      <>
        <h3 className="collection__list__title">
          {title} - {data.length}
        </h3>
        <ul className="collection__list">
          {data.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
});

export default TaskList;
