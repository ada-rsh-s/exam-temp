import { useState } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import _ from "lodash";
import ClassTable from "./ClassTable";
import { useNavigate } from "react-router-dom";

const classCapacity = {
  // EAB415: [15, 10],
  // EAB416: [15, 10],
  WAB412: [10, 5],
  // EAB310: [10, 4],
  EAB217: [10, 4],
  EAB304: [10, 4],
  EAB303: [10, 4],
  //EAB306: [9, 4], → S7
  //EAB206: [11, 4], → S7
  //EAB203: [11, 4], → S7
  WAB206: [10, 4],
  ADM303: [21, 2],
  ADM304: [10, 4],
  ADM305: [10, 4],
  ADM306: [10, 4],
  WAB106: [10, 4],
  ADM307: [9, 4],
  ADM308: [10, 4],
  ADM309: [10, 4],
  ADM310: [10, 4],
  WAB205: [10, 4],
  EAB204: [10, 4],
  EAB103: [10, 4],
  EAB106: [10, 4],
  EAB104: [7, 6],
  EAB407: [10, 4],
  EAB405: [10, 4],
  //EAB401: [11, 4], → S7
  WAB105: [10, 4],
  //WAB107: [8, 4], → S7
  //WAB207: [13, 4], → S7
  WAB406: [10, 4],
  WAB403: [10, 4],
  WAB405: [10, 4],
  WAB305: [10, 4],
  WAB304: [10, 4],
  WAB210: [10, 4],
  EAB112: [7, 4],
  WAB404: [8, 4],
  ADM311: [9, 4],
};

let deptStrength = {
  "24CS": 0,
  "24AD": 0,
  "24CE": 0,
  "24EC": 0,
  "24EE": 0,
  "24ME": 0,
  "24MC": 0,
  "24RA": 0,
  "21AD": 52,
  "21CE": 26,
  "21CS": 124,
  "21EC": 35,
  "21EE": 26,
  "21ME": 34,
  "21MC": 24,
  "21RA": 15,
  "22AD": 61,
  "22CE": 20,
  "22CS": 125,
  "22EC": 51,
  "22EE": 35,
  "22ME": 37,
  "22MC": 25,
  "22RA": 15,
  "23AD": 56,
  "23CE": 19,
  "23CS": 174,
  "23RA": 0,
  "23CC": 43,
  "23EC": 44,
  "23EE": 28,
  "23ME": 30,
  "23MC": 34,
};
let letStrength = {
  //S1
  "24CS": 0,
  "24AD": 0,
  "24CE": 0,
  "24EC": 0,
  "24EE": 0,
  "24ME": 0,
  "24MC": 0,
  "24RA": 0,
  //S7
  "21AD": 3,
  "21CE": 17,
  "21CS": 3,
  "21EC": 8,
  "21EE": 8,
  "21ME": 23,
  "21MC": 2,
  "21RA": 1,
  //S5  ---------------> No changes from previous data
  "22AD": 3,
  "22CE": 11,
  "22CS": 3,
  "22EC": 6,
  "22EE": 15,
  "22ME": 21,
  "22MC": 5,
  "22RA": 0,
  //S3
  "23AD": 3,
  "23CE": 9,
  "23CS": 9,
  "23CC": 2, // confusion 0 here
  "23EC": 10,
  "23EE": 19,
  "23ME": 22,
  "23MC": 10,
  "23RA": 0, //stopped
};

let exams = {
  "24CS": ["HUN101"],
  "24AD": ["HUN101"],
  "24CE": ["HUN101"],
  "24EC": ["HUN101"],
  "24EE": ["HUN101"],
  "24ME": ["HUN101"],
  "24MC": ["HUN101"],
  "24RA": ["HUN101"],
  "23AD": ["EST200", "HUT200", "MCN201"],
  "23CE": ["EST200", "HUT200", "MCN201"],
  "23CC": ["EST200", "HUT200", "MCN201"],
  "23CS": ["EST200", "HUT200", "MCN201"],
  "23EC": ["EST200", "HUT200", "MCN201"],
  "23EE": ["EST200", "HUT200", "MCN201"],
  "23ME": ["EST200", "HUT200", "MCN201"],
  "23MC": ["EST200", "HUT200", "MCN201"],
  "23RA": ["EST200", "HUT200", "MCN201"],
  "22AD": ["CST309", "MCN301"],
  "22CE": ["CET309", "MCN301"],
  "22CS": ["CST309", "MCN301"],
  "22EC": ["HUT300", "HUT310", "MCN301"],
  "22EE": ["HUT300", "HUT310", "MCN301"],
  "22ME": ["HUT300", "HUT310", "MCN301"],
  "22MC": ["HUT300", "HUT310", "MCN301"],
  "22RA": ["HUT300", "HUT310", "MCN301"],
};

let sup = {
  // CST309: [
  //   "JEC22ES010",
  //   "JEC22ES011",
  //   "JEC22ES015",
  //   "JEC22ES160",
  //   "JEC22ES170",
  // ],
};

let drop = [
  "JEC23CE004",
  "JEC23CS080",
  "JEC23ME007",
  "JEC23ME027",
  "JEC22ME013",
  "JEC22CS044",
  "JEC22CS059",
  "JEC22CS084",
  "JEC22CS117",
  "LJEC22EE050",
  "JEC22ME007",
  "JEC22ME010",
  "LJEC22ME057",
  "JEC22MC022",
];

const rejoin = {
  "23CS": ["JEC22CS059", "JEC22CS117"],
};

export const slots = {
  E: ["HUT300", "HUT310", "HUT200", "EST200", "CET309", "CST309"],
  F: ["MCN201", "MCN301"],
};

//selecting the slot for locating the subjects to be written on that day
const examToday = slots.F;

let examsCopy = exams;

Object.keys(sup).forEach((key) => {
  exams[`SUP_${key}`] = [key];
});
Object.keys(sup).forEach((key) => {
  deptStrength[`SUP_${key}`] = sup[key].length;
});

function mergeExamSchedules(exams) {
  let updatedExams = {};
  for (let key in exams) {
    let mergedExams = new Set(exams[key]);
    for (let otherKey in exams) {
      if (key !== otherKey) {
        exams[key].forEach((exam) => {
          if (exams[otherKey].includes(exam)) {
            exams[otherKey].forEach((otherExam) => mergedExams.add(otherExam));
          }
        });
      }
    }
    updatedExams[key] = Array.from(mergedExams);
  }
  if (_.isEqual(updatedExams, exams) == false)
    return mergeExamSchedules(updatedExams);
  else return updatedExams;
}

exams = mergeExamSchedules(exams, sup);

//necessary indices and arrays
let classes = [],
  lastIndex = 0,
  data = [],
  supIndex = 0,
  rejoinIndex = 0;

const updateDeptStrength = (deptStrength, letStrength) => {
  const updatedDeptStrength = {};
  for (const dept in deptStrength) {
    const rejoinStrength = rejoin[dept] ? rejoin[dept].length : 0;
    updatedDeptStrength[dept] =
      deptStrength[dept] + (letStrength[dept] || 0) + rejoinStrength;
  }
  return updatedDeptStrength;
};

deptStrength = updateDeptStrength(deptStrength, letStrength);

export const getDepartmentDetails = (departments) => {
  const deptStrengthMap = new Map();

  departments.forEach(([department, strength]) => {
    if (!deptStrengthMap.has(department)) {
      deptStrengthMap.set(department, strength);
    } else {
      deptStrengthMap.set(
        department,
        deptStrengthMap.get(department) + strength
      );
    }
  });

  return Array.from(deptStrengthMap.entries())
    .map(([dept, strength]) => `${dept} - ${strength} `)
    .join(" || ");
};

//for initializing classes
const classNames = Object.keys(classCapacity);

for (let i = 0; i < classNames.length; i++) {
  const [rows, cols] = classCapacity[classNames[i]];
  classes[i] = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
}

//to calculate strength of odd/even indices
function strengthCalculator(n, data) {
  let strength = 0;

  for (let i = n; i < data.length; i += 2) {
    strength += data[i][1];
  }

  return strength;
}

//for efficient grouping of departments
function optimizer(resultArray, n) {
  for (const key in resultArray) {
    const subArray = resultArray[key];
    if (subArray.length > n && n == 1) {
      continue;
    }
    const evenStrength = strengthCalculator(0, data);
    const oddStrength = strengthCalculator(1, data);
    if (subArray.length >= n) {
      let sub;
      if (n === 1) {
        sub = [subArray[0]];
      } else {
        sub = [subArray[0], ["DUM", 0], subArray[1]];
        if (subArray.length > n) {
          for (let j = 2; j < subArray.length; j++) {
            sub = sub.concat([["DUM", 0], subArray[j]]);
          }
        }
      }
      if (evenStrength > oddStrength) {
        if (lastIndex % 2 !== 0) {
          data = data.concat(sub);
          lastIndex++;
        } else {
          data = data.concat([["DUM", 0]], sub);
        }
      } else {
        if (lastIndex % 2 === 0) {
          data = data.concat(sub);
          lastIndex++;
        } else {
          data = data.concat([["DUM", 0]], sub);
        }
      }
    }
  }
}

//sorting of the resultArray
function arrayStrength(array) {
  let total = 0;
  for (let i = 0; i < array[1].length; i++) {
    total += array[1][i][1];
  }
  return total;
}
function arraySorter(resultArray) {
  let resultArrayEntries = Object.entries(resultArray);

  for (let i = 1; i < resultArrayEntries.length; i++) {
    let key = resultArrayEntries[i];
    let j = i - 1;
    while (
      j >= 0 &&
      arrayStrength(resultArrayEntries[j]) < arrayStrength(key)
    ) {
      resultArrayEntries[j + 1] = resultArrayEntries[j];
      j = j - 1;
    }
    resultArrayEntries[j + 1] = key;
  }
  const finalResultArray = Object.fromEntries(resultArrayEntries);

  return finalResultArray;
}

let viewResultArray = {};

function viewExams(examToday, exams, deptStrength) {
  const resultArray = {};

  const deptList = Object.keys(exams);
  const subList = Object.values(exams);
  const supplySubs = Object.keys(sup);

  examToday.forEach((exam) => {
    let subArray = [];
    deptList.forEach((dept, index) => {
      if (subList[index].includes(exam)) {
        const num = deptStrength[dept];
        subArray.push([dept, num]);
      }
      resultArray[exam] = subArray;
    });

    supplySubs.forEach((supplySub, index) => {
      if (supplySubs[index].includes(exam)) {
        let supply_num = sup[supplySubs[index]].length;
        subArray.push([`SUP_${exam}`, supply_num]);
      }

      resultArray[exam] = subArray;
    });
  });

  viewResultArray = resultArray;
}
viewExams(examToday, examsCopy, deptStrength);
//Normal grouping of departments
function dataArrayMaker(examToday, exams, deptStrength) {
  const resultArray = {};

  const deptList = Object.keys(exams);
  const subList = Object.values(exams);
  const deptSet = new Set();

  examToday.forEach((exam) => {
    let subArray = [];
    deptList.forEach((dept, index) => {
      if (subList[index].includes(exam)) {
        const num = deptStrength[dept];
        if (!deptSet.has(dept)) {
          subArray.push([dept, num]);
          deptSet.add(dept);
        }
      }
    });

    if (subArray.length > 0) {
      resultArray[exam] = subArray;
    }
  });

  Object.keys(resultArray).forEach((key) => {
    if (resultArray[key].length === 0) {
      delete resultArray[key];
    }
  });

  optimizer(arraySorter(resultArray), 2);
  optimizer(arraySorter(resultArray), 1);
  return data;
}
data = dataArrayMaker(examToday, exams, deptStrength);

let evenBenchIndex = 0;
let oddBenchIndex = 1;
let evenRowIndex = 0;
let oddRowIndex = 0;
let evenClassIndex = 0;
let oddClassIndex = 0;
let supRollNum = [];

function formatToThreeDigits(number) {
  return number.toString().padStart(3, "0");
}

const seatArr = (n, sub, b1) => {
  if (n === 0) return;
  let num = 1;
  let benchIndex = b1 % 2 === 0 ? evenBenchIndex : oddBenchIndex;
  let rowIndex = b1 % 2 === 0 ? evenRowIndex : oddRowIndex;
  let classIndex = b1 % 2 === 0 ? evenClassIndex : oddClassIndex;
  if (sub.includes("SUP")) {
    const supSub = sub.substring(4);
    supRollNum = sup[supSub];
  }
  const rejoinDept = Object.keys(rejoin);
  let rejoinLength = 0;
  let rejoinList;
  let rejoinStr;
  if (rejoinDept.includes(sub)) {
    rejoinList = rejoin[sub];
    rejoinLength = rejoinList.length;
    rejoinStr = n - rejoinLength;
  }
  for (let Class = classIndex; Class < classes.length; Class++) {
    const currentClass = classes[Class];
    for (let j = benchIndex; j < currentClass[0].length; j += 2) {
      for (let i = rowIndex; i < currentClass.length; i++) {
        let flag = true;
        if (sub.includes("SUP")) {
          currentClass[i][j] = supRollNum[supIndex];
          supIndex++;
          if (n === supIndex) {
            supIndex = 0;
            num = n;
          }
        } else if (rejoinDept.includes(sub) && n - (rejoinLength - 1) === num) {
          currentClass[i][j] = rejoinList[rejoinIndex];
          rejoinIndex++;
          rejoinLength--;
          if (rejoinLength === 0) {
            num = n;
          }
        } else {
          let sNum = formatToThreeDigits(num);
          while (
            drop.includes("JEC" + sub.concat(sNum)) ||
            drop.includes("LJEC" + sub.concat(sNum))
          ) {
            num++;
            sNum = formatToThreeDigits(num);
          }
          if (num <= deptStrength[sub] - (letStrength[sub] + rejoinLength)) {
            currentClass[i][j] = "JEC" + sub.concat(sNum);
          } else {
            currentClass[i][j] = "LJEC" + sub.concat(sNum);
          }
          if (num > n) {
            num--;
          }
        }
        if (num === n) {
          let n1, n2;
          if (currentClass[0].length % 2 === 0) {
            n1 = 2;
            n2 = 1;
          } else {
            n1 = 1;
            n2 = 2;
          }
          if (i === currentClass.length - 1 && b1 % 2 === 0) {
            evenRowIndex = 0;
            evenBenchIndex = j + 2;

            if (
              currentClass[currentClass.length - 1][
                currentClass[0].length - n1
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
                currentClass[0].length - n2
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
  dept, num;
  if (subjectAllotedNum % 2 === 0) {
    seatArr(num, dept, 0);
  } else {
    seatArr(num, dept, 1);
  }
  subjectAllotedNum++;
}

const consolidateItems = (items) => {
  const groupedItems = {};

  items.forEach((item) => {
    if (item != 0) {
      const [prefix, num] = item
        .match(/^([A-Z]{3,4}\d{2}[A-Z]{2})(\d{3})$/)
        .slice(1);

      if (!groupedItems[prefix]) groupedItems[prefix] = [];
      groupedItems[prefix].push(Number(num));
    }
  });

  return Object.entries(groupedItems).flatMap(([prefix, nums]) => {
    nums.sort((a, b) => a - b);
    const first = `${prefix}${formatToThreeDigits(nums[0])}`;
    const last = `${prefix}${formatToThreeDigits(nums[nums.length - 1])}`;
    return [first, last];
  });
};

// const rejoin = {
//   "23CS": ["JEC22CS059", "JEC22CS117"],
// };

const calculateCounts = (items, sup) => {
  const counts = [];

  for (let i = 1; i < items.length; i += 2) {
    const num1 = parseInt(items[i].slice(-3));
    const num0 = parseInt(items[i - 1].slice(-3));
    const match = items[i].match(/^L?JEC(\d{2})([A-Z]{2})\d{3}$/);
    let dropCount = 0,
      supCount = 0;
    let flag = false;
    const supArray = Object.values(sup).flat();

    let result;
    if (match) {
      result = `${match[1]}${match[2]}`;
      for (let j = num0; j < num1; j++) {
        if (
          drop.includes("JEC" + result + formatToThreeDigits(j)) ||
          drop.includes("LJEC" + result + formatToThreeDigits(j))
        ) {
          flag = true;
          dropCount++;
        }
        if (
          supArray.includes("JEC" + result + formatToThreeDigits(j)) ||
          supArray.includes("LJEC" + result + formatToThreeDigits(j))
        ) {
          supCount++;
        }
      }
      if (!flag) {
        if (supCount == 0) {
          counts.push(num1 - num0 + 1);
        } else {
          counts.push(supCount + 1);
          supCount = 0;
        }
      } else {
        let inRejoinAndDrop = false;
        const rejoinKey = Object.keys(rejoin).find((key) =>
          rejoin[key].includes("JEC" + result + formatToThreeDigits(num1))
        );
        if (
          rejoinKey &&
          rejoin[rejoinKey].some((item) => drop.includes(item))
        ) {
          inRejoinAndDrop = true;
        }

        if (inRejoinAndDrop && rejoinKey !== result) {
          counts.push(dropCount);
        } else {
          counts.push(num1 - num0 + 1 - dropCount);
        }

        dropCount = 0;
      }
    }
  }

  return counts;
};

const noticeBoardView = classes.map((cls, idx) => {
  const allItems = cls.flat();
  const consolidatedItems = consolidateItems(allItems);
  const counts = calculateCounts(consolidatedItems, sup);

  return {
    class: classNames[idx],
    items: consolidatedItems,
    count: counts,
  };
});

function attendanceSheet(singleClass, className) {
  const oddIndexedStudents = [];
  const evenIndexedStudents = [];

  // Traverse the input column-wise
  for (let i = 0; i < singleClass[0].length; i++) {
    for (let j = 0; j < singleClass.length; j++) {
      if (i % 2 === 0) {
        evenIndexedStudents.push({ regNo: singleClass[j][i] });
      } else {
        oddIndexedStudents.push({ regNo: singleClass[j][i] });
      }
    }
  }

  // Combine odd and even indexed students
  const students = [...evenIndexedStudents, ...oddIndexedStudents];

  return {
    class: className,
    students: students,
  };
}
const attendanceData = classes.map((singleClass, index) => {
  const className = classNames[index]; // Get the class name for the current index
  return attendanceSheet(singleClass, className);
});
console.log(attendanceData);


const extractDepartmentYear = (rollNo) => {
  const match = rollNo.match(/L?JEC(\d{2})([A-Z]{2})/);
  return match ? `${match[1]}${match[2]}` : null;
};
const organizeByDept = (data) => {
  const deptMap = {};

  data.forEach(({ class: room, items }) => {
    items.forEach((rollNo) => {
      let deptYear = extractDepartmentYear(rollNo);
      if (!deptYear) return;

      for (const [newDeptYear, rejoinList] of Object.entries(rejoin)) {
        if (rejoinList.includes(rollNo)) {
          deptYear = newDeptYear;
          break;
        }
      }

      if (!deptMap[deptYear]) {
        deptMap[deptYear] = [];
      }

      deptMap[deptYear].push({ room, rollNo });
    });
  });

  const result = Object.keys(deptMap).map((deptYear) => {
    const rooms = [];
    const rollNums = [];

    for (let i = 0; i < deptMap[deptYear].length; i += 2) {
      const { room: room1, rollNo: rollNo1 } = deptMap[deptYear][i];
      const { room: room2, rollNo: rollNo2 } = deptMap[deptYear][i + 1] || {};

      rooms.push(room1);
      rollNums.push(rollNo1, rollNo2);
    }

    const counts = calculateCounts(rollNums, sup);

    return {
      dept: deptYear,
      rooms,
      rollNums,
      count: counts,
    };
  });

  result.sort((a, b) => {
    const yearA = parseInt(a.dept.match(/\d+/)[0]);
    const yearB = parseInt(b.dept.match(/\d+/)[0]);

    const deptA = a.dept.match(/[A-Z]+/)[0];
    const deptB = b.dept.match(/[A-Z]+/)[0];

    if (yearA < yearB) return -1;
    if (yearA > yearB) return 1;

    if (deptA < deptB) return -1;
    if (deptA > deptB) return 1;

    return 0;
  });

  return result;
};
const deptView = organizeByDept(noticeBoardView);

const classroomView = (data) => {
  const numRows = data.length;
  const numCols = data[0].length;

  let aCounter = 1;
  let bCounter = 1;

  const updatedData = Array.from({ length: numRows }, () =>
    Array(numCols * 2 - 1)
  );

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const labelPrefix = col % 2 === 0 ? "A" : "B";
      const labelNumber = col % 2 === 0 ? aCounter++ : bCounter++;
      const label = `${labelPrefix}${labelNumber}`;
      updatedData[row][col * 2] = label;
      updatedData[row][col * 2 + 1] = data[row][col];
    }
  }

  return updatedData;
};

// classes.forEach((cls, idx) => {
// console.log(classroomView(cls));
// });

// classes.forEach((cls, idx) => {
//   console.log(`\n${classNames[idx]}\n`);
//   cls.forEach((row) => {
//     console.log(row);
//   });
// });

export const createItemPairs = (items) => {
  const pairs = [];
  for (let i = 0; i < items.length - 1; i += 2) {
    if (i + 1 < items.length) {
      pairs.push(`${items[i]} - ${items[i + 1]}`);
    }
  }
  return pairs;
};

const homeData = {
  examToday,
  viewResultArray,
  noticeBoardView,
  deptView,
  classNames,
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home data={homeData} />} />
          <Route
            path="/class-table"
            element={
              <ClassTable classes={classes} classroomView={classroomView} />
            }
          />
          <Route
            path="/attendance"
            element={
              <div>
                {attendanceData.map((notice, index) => {
                  return (
                    <div key={index}>
                      <h1>{notice.class}</h1>{" "}
                      {/* Render the class name as a heading */}
                      <table border="1">
                        <thead>
                          <tr>
                            <th>Registration Number</th>
                            <th>Name</th>
                            <th>Sign</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notice.students.map((student, idx) => (
                            <tr key={idx}>
                              <td>{student.regNo}</td>
                              <td></td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
