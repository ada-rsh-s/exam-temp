import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { createItemPairs, getDepartmentDetails, slots } from "./App";
import { useNavigate } from "react-router-dom";

const Home = ({
  data: { examToday, viewResultArray, noticeBoardView, deptView, classNames },
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (classIndex, className) => {
    navigate("/class-table", { state: { classIndex, className } });
  };

  return (
    <>
      <div>
        <h3 style={{ color: "green" }}>
          Today's Exams - {examToday.join(", ")}
        </h3>
      </div>

      <div>
        <ul>
          {Object.entries(viewResultArray).map(([subject, departments]) => (
            <li style={{ fontWeight: "500" }} key={subject}>
              {subject} writing by {getDepartmentDetails(departments)} Students
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Notice Board</h1>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Register No</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {noticeBoardView.map(
              ({ class: className, items, count }, classIndex) => {
                const pairs = createItemPairs(items);
                const rowSpan = pairs.length || 1;

                return pairs.length > 0 ? (
                  pairs.map((pair, pairIndex) => (
                    <tr key={`${className}-${pairIndex}`}>
                      {pairIndex === 0 && (
                        <td rowSpan={rowSpan}>{className}</td>
                      )}
                      <td>{pair}</td>
                      <td>{count[pairIndex] || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={classIndex}>
                    <td>{className}</td>
                    <td>EMPTY</td>
                    <td>-</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Department View</h1>

        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Room</th>
              <th>Roll Numbers</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {deptView.map((item, index) => {
              const pairs = createItemPairs(item.rollNums);
              return item.rooms.map((room, roomIndex) => (
                <tr key={`${index}-${roomIndex}`}>
                  {roomIndex === 0 ? (
                    <td rowSpan={item.rooms.length}>{item.dept}</td>
                  ) : null}
                  <td>{room}</td>
                  <td>{pairs[roomIndex] || "-"}</td>
                  <td>{item.count[roomIndex]}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Classroom Door View</h1>

        <div>
          {classNames.map((className, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index, className)}
              className="button"
            >
              {className}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
