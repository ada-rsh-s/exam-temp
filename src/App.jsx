import React from "react";
import "./App.css";

const no_classes = 36,
  classCapacity = {
    "EAB 415": [15, 10],
    "EAB 416": [15, 10],
    "WAB 412": [15, 10],
    "EAB 310": [10, 4],
    EAB304: [10, 4],
    EAB303: [10, 4],
    EAB306: [10, 4],
    EAB206: [10, 4],
    EAB203: [10, 4],
    EAB204: [10, 4],
    EAB103: [10, 4],
    EAB106: [10, 4],
    EAB104: [10, 4],
    EAB407: [10, 4],
    EAB405: [10, 4],
    EAB401: [10, 4],
    WAB105: [10, 4],
    WAB106: [10, 4],
    WAB107: [10, 4],
    WAB210: [10, 4],
    WAB207: [10, 4],
    WAB206: [10, 4],
    WAB205: [10, 4],
    WAB406: [10, 4],
    WAB403: [10, 4],
    WAB405: [10, 4],
    WAB305: [10, 4],
    WAB304: [10, 4],
    "ADM 303": [10, 4],
    "ADM 304": [10, 4],
    "ADM 305": [10, 4],
    "ADM 306": [10, 4],
    "ADM 307": [10, 4],
    "ADM 308": [10, 4],
    "ADM 309": [10, 4],
    "ADM 310": [10, 4],
    "ADM 311": [10, 4],
  };

let deptStrength = {
  "24CS": 0,
  "24AD": 0,
  "24CE": 0,
  "24EC": 0,
  "24EE": 0,
  "24ME": 0,
  "24MR": 0,
  "24RA": 0,
  "21AD": 52,
  "21CE": 26,
  "21CS": 124,
  "21EC": 35,
  "21EE": 26,
  "21ME": 34,
  "21MR": 24,
  "21RA": 15,
  "22AD": 61,
  "22CE": 20,
  "22CS": 121,
  "22EC": 51,
  "22EE": 35,
  "22ME": 34,
  "22MR": 24,
  "22RA": 15,
  "23AD": 56,
  "23CE": 18,
  "23CS": 175,
  "23RA": 0,
  "23CSE(Y)": 43,
  "23EC": 44,
  "23EE": 28,
  "23ME": 28,
  "23MR": 34,
};
let letStrength = {
  "24CS": 0,
  "24AD": 0,
  "24CE": 0,
  "24EC": 0,
  "24EE": 0,
  "24ME": 0,
  "24MR": 0,
  "24RA": 0,
  "21AD": 3,
  "21CE": 17,
  "21CS": 3,
  "21EC": 8,
  "21EE": 8,
  "21ME": 23,
  "21MR": 2,
  "21RA": 1,
  "22AD": 3,
  "22CE": 11,
  "22CS": 3,
  "22EC": 6,
  "22EE": 15,
  "22ME": 20,
  "22MR": 5,
  "23RA": 0,
  "22RA": 0,
  "23AD": 3,
  "23CE": 9,
  "23CS": 7,
  "23CSE(Y)": 0,
  "23EC": 0,
  "23EE": 15,
  "23ME": 20,
  "23MR": 9,
};

let exams = {
  "24CS": ["HUN101"],
  "24AD": ["HUN101"],
  "24CE": ["HUN101"],
  "24EC": ["HUN101"],
  "24EE": ["HUN101"],
  "24ME": ["HUN101"],
  "24MR": ["HUN101"],
  "24RA": ["HUN101"],
  "23AD": ["EST200", "HUT200", "MCN201"],
  "23EE": ["EST200", "HUT200", "MCN201"],
  "23RA": ["EST200", "HUT200", "MCN201"],
  "23CE": ["EST200", "HUT200", "MCN201"],
  "23CS": ["EST200", "HUT200", "MCN201"],
  "23MR": ["EST200", "HUT200", "MCN201"],
  "23ME": ["EST200", "HUT200", "MCN201"],
  "23EC": ["EST200", "HUT200", "MCN201"],
  "23CSE(Y)":[],
  "22AD": ["CST309", "MCN301"],
  "22CE": ["CET309", "MCN301"],
  "22CS": ["CST309", "MCN301"],
  "22EC": ["HUT300", "HUT310", "MCN301"],
  "22EE": ["HUT300", "HUT310", "MCN301"],
  "22ME": ["HUT300", "HUT310", "MCN301"],
  "22MR": ["HUT300", "HUT310", "MCN301"],
  "22RA": ["HUT300", "HUT310", "MCN301"],
  "21AD": ["CET415"],
  "21CS": ["CET415"],
  "21EC": ["CET445"],
  "21ME": ["CET445"],
  "21MR": ["CET445"],
  "21CE": ["MET445"],
  "21EE": ["MET445"],
};

let sup = {};

const slots = {
  E: [
    "HUN101",
    "EST200",
    "HUT200",
    "HUT300",
    "HUT310",
    "CET415",
    "CET445",
    "MET445",
  ],
};

//selecting the slot for locating the subjects to be written on that day
const examToday = slots.E;

//necessary indices and arrays
let class_index = 0,
  classes = [],
  lastIndex = 0,
  data = [],
  supIndex = 0;

const updateDeptStrength = (deptStrength, letStrength) => {
  const updatedDeptStrength = {};
  for (const dept in deptStrength) {
    updatedDeptStrength[dept] = deptStrength[dept] + (letStrength[dept] || 0);
  }
  return updatedDeptStrength;
};

deptStrength = updateDeptStrength(deptStrength, letStrength);

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

function mergeDepts(exams) {
  let examsArray = Object.entries(exams);
  examsArray = examsArray.flat();

  let seen = new Set();
  let filteredData = {};

  for (let i = 0; i < examsArray.length; i += 2) {
    let key = examsArray[i];
    let values = examsArray[i + 1];

    let uniqueValues = values.filter(([code, _]) => {
      if (!seen.has(code)) {
        seen.add(code);
        return true;
      }
      return false;
    });

    if (uniqueValues.length > 0) {
      filteredData[key] = uniqueValues;
    }
  }

  return filteredData;
}

let viewResultArray = {};

//Normal grouping of departments
function dataArrayMaker(examToday, exams, deptStrength) {
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

  const mergedArray = mergeDepts(resultArray);

  optimizer(arraySorter(mergedArray), 2);
  optimizer(arraySorter(mergedArray), 1);

  return data;
}
data = dataArrayMaker(examToday, exams, deptStrength);

const splitString = (str) => {
  const match = str.match(/^(\d+)([A-Za-z]+)(\d+)$/);

  if (match) {
    const deptCode = match[1] + match[2];
    const value = parseInt(match[3], 10);

    if (deptStrength.hasOwnProperty(deptCode)) {
      const difference = deptStrength[deptCode] - (letStrength[deptCode] || 0);
      return difference >= value;
    }
    return false;
  }
  return false;
};

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
  let sNum = "";
  let num = 1;
  let benchIndex = b1 % 2 === 0 ? evenBenchIndex : oddBenchIndex;
  let rowIndex = b1 % 2 === 0 ? evenRowIndex : oddRowIndex;
  let classIndex = b1 % 2 === 0 ? evenClassIndex : oddClassIndex;
  if (sub.includes("SUP")) {
    const supSub = sub.substring(4);
    supRollNum = sup[supSub];
  }

  for (let Class = classIndex; Class < classes.length; Class++) {
    const currentClass = classes[Class];
    for (let j = benchIndex; j < currentClass[0].length; j += 2) {
      for (let i = rowIndex; i < currentClass.length; i++) {
        if (sub.includes("SUP")) {
          currentClass[i][j] = supRollNum[supIndex];
          supIndex++;
          if (n === supIndex) {
            supIndex = 0;
          }
        } else {
          sNum = formatToThreeDigits(num);
          if (splitString(sub.concat(sNum)) == true) {
            currentClass[i][j] = "JEC" + sub.concat(sNum);
          } else {
            currentClass[i][j] = "LJEC" + sub.concat(sNum);
          }
        }

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

const result = classes.map((cls, idx) => {
  const allItems = cls.flat();

  return {
    class: classNames[idx],
    items: consolidateItems(allItems),
  };
});



const createItemPairs = (items) => {
  const pairs = [];
  for (let i = 0; i < items.length - 1; i += 2) {
    if (i + 1 < items.length) {
      pairs.push(`${items[i]} - ${items[i + 1]}`);
    }
  }
  return pairs;
};

const getDepartmentDetails = (departments) => {
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

const App = () => {
  return (
    <div className="App">
      <h1>Exam Seating Arrangement</h1>
      <div>
        <h3 style={{ color: "lightgreen" }}>
          Today's Exams - {examToday.join(", ")}
        </h3>
        <h></h>
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
        <h3 style={{ color: "lightgreen" }}>
          Neighbouring Seats left empty -{" "}
          {Math.abs(strengthCalculator(0, data) - strengthCalculator(1, data))}
        </h3>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Register No</th>
          </tr>
        </thead>
        <tbody>
          {result.map(({ class: className, items }, classIndex) => {
            const pairs = createItemPairs(items);
            const rowSpan = pairs.length || 1;

            return pairs.length > 0 ? (
              pairs.map((pair, pairIndex) => (
                <tr key={`${className}-${pairIndex}`}>
                  {pairIndex === 0 && <td rowSpan={rowSpan}>{className}</td>}
                  <td>{pair}</td>
                </tr>
              ))
            ) : (
              <tr key={classIndex}>
                <td>{className}</td>
                <td>EMPTY</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {classes.map((cls, idx) => (
        <div key={idx} className="class-section">
          <h2>{classNames[idx]}</h2>
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