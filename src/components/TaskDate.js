import React, { useEffect, useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Apr",
  "March",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TaskDate = ({ color, date }) => {
  const [beautyDate, setBeautyDate] = useState("");

  useEffect(() => {
    const newDate = new Date(
      date.split("-")[0],
      date.split("-")[1] - 1,
      date.split("-")[2]
    );
    const worldDate = new Date(new Date().setHours(0, 0, 0, 0));
    let stringDate = "";

    if (newDate.getFullYear() === worldDate.getFullYear()) {
      if (
        newDate.getDate() === worldDate.getDate() &&
        newDate.getMonth() === worldDate.getMonth()
      ) {
        stringDate = "Today";
      } else if (newDate.getDate() > worldDate.getDate()) {
        if (
          newDate.getDate() - worldDate.getDate() === 1 &&
          newDate.getMonth() === worldDate.getMonth()
        ) {
          stringDate = "Tomorrow";
        } else if (
          newDate.getDate() - worldDate.getDate() < 7 &&
          worldDate.getMonth() === newDate.getMonth()
        ) {
          stringDate = `${weekdays[newDate.getDay()]}`;
        } else {
          stringDate = `${newDate.getDate()} ${months[newDate.getMonth()]}`;
        }
      } else if (newDate.getDate() < worldDate.getDate()) {
        if (
          worldDate.getDate() - newDate.getDate() === 1 &&
          worldDate.getMonth() === newDate.getMonth()
        ) {
          stringDate = "Yesterday";
        } else {
          stringDate = `${newDate.getDate()} ${months[newDate.getMonth()]}`;
        }
      }
    } else {
      stringDate = `${newDate.getDate()} ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    }

    setBeautyDate(stringDate);
  }, []);

  return (
    <span className="collection__item__date" style={{ color }}>
      <svg
        className="collection__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
      </svg>
      {beautyDate}
    </span>
  );
};

export default TaskDate;
