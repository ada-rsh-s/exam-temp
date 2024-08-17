import React from "react";
import "./App.css";
const no_classes = 25,
  classCapacity = {
    EAB415: [15, 4],
    EAB416: [15, 4],
    WAB412: [15, 4],
    EAB310: [10, 4],
    EAB304: [10, 4],
    EAB310: [10, 4],
    EAB350: [10, 4],
    EAB311: [10, 4],
    EAB320: [10, 4],
    EAB316: [10, 4],
    EAB308: [10, 4],
  };
let class_index = 0,
  classes = [],
  lastIndex = 0,
  data = [];

let deptStrength = {
  "22CS": 120,
  "22AD": 60,
  "22CE": 40,
  "22ME": 30,
  "22EC": 60,
  "22RA": 30,
  "22CY": 20,
  "22MR": 0,
};
let letStrength = {
  "22CS": 5,
  "22CE": 3,
  "22ME": 2,
  "22EC": 5,
  "22RA": 4,
  "22CY": 7,
  "22MR": 6,
};

let exams = {
  "22CS": ["CS1", "CS2", "CS6", "CS7", "CS8", "CS9", "CS10"],
  "22AD": ["AD1", "AD2", "AD6", "AD7", "AD8", "AD9", "CS6"],
  "22EC": ["EC1", "EC2", "EC6", "EC7", "EC8", "EC9", "CS6"],
  "22ME": ["ME1", "ME2", "ME6", "ME7", "ME8", "ME9", "ME10"],
  "22CE": ["CE1", "CE2", "CE6", "CE7", "CE8", "ME6", "CS5"],
  "22CY": ["CY1", "CY2", "CY6", "CY7", "CY8", "CY9", "CY10"],
  "22RA": ["RA1", "RA2", "RA6", "RA7", "RA8", "RA9", "RA10"],
};

const electives = {
  "22CS": ["CS6", "CS7", "CS8", "CS9", "CS10"],
  "22AD": ["AD6", "AD7", "AD8", "AD9", "CS6"],
  "22EC": ["EC6", "EC7", "EC8", "EC9", "CS6"],
  "22ME": ["ME6", "ME7", "ME8", "ME9", "ME10"],
  "22CE": ["CE6", "CE7", "CE8", "ME6", "CS5"],
  "22CY": ["CY6", "CY7", "CY8", "CY9", "CY10"],
  "22RA": ["RA6", "RA7", "RA8", "RA9", "RA10"],
};

let supIndex = 0;
let sup = {
  RA1: ["JEC19RA004", "JEC19RA007"],
  ME1: ["JEC19ME004", "JEC19ME013", "JEC19ME007"],
};

const slots = {
  A: ["CS6", "AD6", "EC6", "CY6", "CY7", "RA1", "ME1"],
};

const examToday = slots.A;

const updateDeptStrength = (deptStrength, letStrength) => {
  const updatedDeptStrength = {};
  for (const dept in deptStrength) {
    updatedDeptStrength[dept] = deptStrength[dept] + (letStrength[dept] || 0);
  }
  return updatedDeptStrength;
};

deptStrength = updateDeptStrength(deptStrength, letStrength);
const filterExams = (exams, electives) => {
  const result = {};

  for (const department in exams) {
    const examList = exams[department];
    const electiveList = electives[department];

    if (electiveList.length > 0) {
      result[department] = [
        ...new Set(examList.filter((exam) => !electiveList.includes(exam))),
        electiveList[0],
      ];
    } else {
      result[department] = examList;
    }
  }

  return result;
};

exams = filterExams(exams, electives);

const classNames = Object.keys(classCapacity);

for (let i = 0; i < classNames.length; i++) {
  const [rows, cols] = classCapacity[classNames[i]];
  classes[i] = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
}

function strengthCalculator(n, data) {
  let strength = 0;
  for (let i = n; i < data.length; i += 2) {
    strength += data[i][1];
  }

  return strength;
}

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
          for (j = 2; j < subArray.length; j++) {
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

function shuffleKeys(obj) {
  const keys = Object.keys(obj);
  const shuffledKeys = keys.sort(() => Math.random() - 0.5);

  const shuffledObj = {};
  shuffledKeys.forEach((key) => {
    shuffledObj[key] = obj[key];
  });

  return shuffledObj;
}
let viewResultArray = {};

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
    });

    supplySubs.forEach((supplySub, index) => {
      if (supplySubs[index].includes(exam)) {
        let supply_num = sup[supplySubs[index]].length;
        subArray.push([`SUP_${exam}`, supply_num]);
      }
    });

    resultArray[exam] = subArray;
  });

  const shuffledResult = shuffleKeys(resultArray);
  viewResultArray = shuffledResult;

  optimizer(shuffledResult, 2);
  optimizer(shuffledResult, 1);

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
      .map(([dept, strength]) => `${dept}: ${strength}`)
      .join(", ");
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
          {Object.entries(viewResultArray).map(
            ([subject, departments]) =>
              departments.length > 0 && (
                <li style={{ fontWeight: "600" }} key={subject}>
                  {subject} writing by {getDepartmentDetails(departments)}
                </li>
              )
          )}
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
