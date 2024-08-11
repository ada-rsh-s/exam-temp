import React, { useState, useEffect } from "react";
import "./App.css";
const no_classes = 25,
  classes = [],
  classno = [];
let class_index = 0;

for (; class_index < 2; class_index++) {
  classes[class_index] = Array(5)
    .fill()
    .map(() => Array(8).fill(0));
}
for (; class_index < no_classes; class_index++) {
  classes[class_index] = Array(5)
    .fill()
    .map(() => Array(4).fill(0));
}

function shuffleEvenOddIndices(array) {
  const evenIndices = array.filter((_, index) => index % 2 === 0);
  const oddIndices = array.filter((_, index) => index % 2 !== 0);

  shuffleArray(evenIndices);

  shuffleArray(oddIndices);

  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      array[i] = evenIndices.shift();
    } else {
      array[i] = oddIndices.shift();
    }
  }
}

function shuffleArray(arr) {
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
}

const deptStrength = {
  CS: 121,
  AD: 60,
  ECE: 40,
  ME: 60,
  CE: 60,
};

const exams = {
  CS: ["CS1", "CS2"],
  AD: ["CS1", "AD2"],
  ECE: ["ECE1", "ME1"],
  ME: ["ME1"],
  CE: ["CE1", "CE2", "CE3"],
};

const examToday = ["CS1", "ME1", "CE1"];

function dataArrayMaker(examToday, exams, deptStrength) {
  let resultArray = {};

  let deptList = Object.keys(exams);
  let subList = Object.values(exams);
  let deptCnt = deptList.length;

  // Building resultArray
  examToday.forEach((exam) => {
    let subArray = [];
    for (let j = 0; j < deptCnt; j++) {
      if (subList[j].includes(exam)) {
        let num = deptStrength[deptList[j]];
        subArray.push([deptList[j], num]);
      }
    }
    resultArray[exam] = subArray;
  });

  // Calculating the length of data array
  let dataLen = 0;
  for (let exam in resultArray) {
    dataLen += resultArray[exam].length;
  }

  let data = new Array(dataLen).fill(0);

  // Filling the data array
  for (let exam in resultArray) {
    let dataIndex = 0;
    for (let k = 0; k < dataLen; k++) {
      if (data[k] === 0) {
        dataIndex = k;
        break;
      }
    }
    resultArray[exam].forEach((item) => {
      if (dataIndex < dataLen) {
        data[dataIndex] = item;
        dataIndex += 2;
      }
    });
  }

  return data;
}

const data = dataArrayMaker(examToday, exams, deptStrength);
shuffleEvenOddIndices(data);
console.log(data);

let evenBenchIndex = 0;
let oddBenchIndex = 1;
let evenRowIndex = 0;
let oddRowIndex = 0;
let evenClassIndex = 0;
let oddClassIndex = 0;

const seatArr = (n, sub, b1) => {
  if (n === 0) return;

  let num = 1;
  let benchIndex = b1 % 2 === 0 ? evenBenchIndex : oddBenchIndex;
  let rowIndex = b1 % 2 === 0 ? evenRowIndex : oddRowIndex;
  let classIndex = b1 % 2 === 0 ? evenClassIndex : oddClassIndex;

  for (let Class = classIndex; Class < classes.length; Class++) {
    const currentClass = classes[Class];
    for (let j = benchIndex; j < currentClass[0].length; j += 2) {
      for (let i = rowIndex; i < currentClass.length; i++) {
        currentClass[i][j] = `${sub} ${num}`;
        if (num === n) {
          if (i === currentClass.length - 1 && b1 % 2 === 0) {
            evenRowIndex = 0;
            evenBenchIndex = j + 2;
            if (
              currentClass[currentClass.length - 1][
                currentClass[0].length - 2
              ] !== 0
            ) {
              evenClassIndex = Class + 1;
              evenRowIndex = 0;
              evenBenchIndex = 0;
            } else {
              evenClassIndex = Class;
            }
            return;
          }
          if (i === currentClass.length - 1 && b1 % 2 !== 0) {
            oddRowIndex = 0;
            oddBenchIndex = j + 2;
            if (
              currentClass[currentClass.length - 1][
                currentClass[0].length - 1
              ] !== 0
            ) {
              oddClassIndex = Class + 1;
              oddRowIndex = 0;
              oddBenchIndex = 1;
            } else {
              oddClassIndex = Class;
            }
            return;
          }
          if (b1 % 2 === 0) {
            evenRowIndex = i + 1;
            evenBenchIndex = j;
            evenClassIndex = Class;
          } else {
            oddRowIndex = i + 1;
            oddBenchIndex = j;
            oddClassIndex = Class;
          }
          return;
        }
        if (i === currentClass.length - 1) {
          benchIndex = b1 % 2 === 0 ? 0 : 1;
          rowIndex = 0;
        }
        num++;
      }
    }
  }
};

let subjectAllotedNum = 0;
for (const [dept, num] of data) {
  if (subjectAllotedNum % 2 === 0) {
    seatArr(num, dept, 0);
  } else {
    seatArr(num, dept, 1);
  }
  subjectAllotedNum++;
}

classes.forEach((cls, idx) => {
  console.log(`\nClass ${idx + 1}\n`);
  cls.forEach((row) => {
    console.log(row);
  });
});

const App = () => {

  return (
    <div className="App">
      <h1>Class Seating Arrangement</h1>
      {classes.map((cls, idx) => (
        <div key={idx} className="class-section">
          <h2>Class {idx + 1}</h2>
          {cls.map((row, rowIndex) => (
            <div key={rowIndex} className="class-row">
              {row.map((seat, seatIndex) => (
                <div key={seatIndex} className="class-seat">
                  {seat || "Empty"}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
