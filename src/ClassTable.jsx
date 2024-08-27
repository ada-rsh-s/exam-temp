import React from "react";
import { useLocation } from "react-router-dom";

const ClassTable = ({classes, classroomView }) => {
  const location = useLocation();

  const { classIndex, className } = location.state || {};

  return (
    <>
      <div>
        <h3>{className}</h3>
        {classes[classIndex][0][0] !== 0 ? (
          <table border="1">
            <thead>
              <tr>
                {[...classes[classIndex][0], ...classes[classIndex][0]].map(
                  (_, colIndex) => (
                    <th key={colIndex}>
                      {colIndex % 2 === 0 ? "Seat No" : "Register No"}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {classroomView(classes[classIndex]).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) =>
                    cell !== 0 ? (
                      <td key={cellIndex}>{cell}</td>
                    ) : (
                      <td key={cellIndex}>Empty</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Empty Class</div>
        )}
      </div>
    </>
  );
};

export default ClassTable;
