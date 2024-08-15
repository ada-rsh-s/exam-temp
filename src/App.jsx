import React from "react";
import "./App.css";
const 
  classCapacity = {
    EAB415: [15, 10],
    EAB416: [15, 10],
    WAB412: [15, 10],
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

const deptStrength = {
  CS: 121,
  AD: 60,
  ECE:40,
  ME: 120,
  CE: 60,
  PE: 30,
  RE: 120,
};
const exams = {
  CS: ["CS1", "CS7"],
  AD: ["CS1","AD2"],
  ECE: ["ECE4", "ECE9"],
  ME: ["ME3", "ME8"],
  CE: ["CE6", "CE8", "CE10"],
  PE: ["PE2", "PE4"],
  RE: ["PE2", "RE5"],
};

const slots = {
  A: ["CS1", "ME3", "PE2","CE6"],
  B: ["ECE4", "RE3"],
  C: ["PE2", "CS7", "CE8", "RE5"],
  D: ["ME8", "ECE9", "CE10"],
  E: ["AD9"],
  F: ["PE4", "RE3", "CS5"],
  G: ["RE5", "CS7", "ME3", "CE6", "ECE4"],
};
const examToday = slots.A;

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
            sub = sub.concat(["DUM", 0], subArray[j]);
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
let viewResultArray = {};
function dataArrayMaker(examToday, exams, deptStrength) {
  const resultArray = {};
  const deptList = Object.keys(exams);
  const subList = Object.values(exams);

  examToday.forEach((exam) => {
    let subArray = [];
    deptList.forEach((dept, index) => {
      if (subList[index].includes(exam)) {
        const num = deptStrength[dept];
        subArray.push([dept, num]);
      }
    });
    resultArray[exam] = subArray;
  });
  viewResultArray = resultArray;
  
console.log(viewResultArray);

  optimizer(resultArray, 2);

  optimizer(resultArray, 1);

  return data;
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

data = dataArrayMaker(examToday, exams, deptStrength);

shuffleEvenOddIndices(data);

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
        currentClass[i][j] = `${sub}${num}`;
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

const consolidateItems = (items) => {
  const groupedItems = {};

  items.forEach((item) => {
    if (item != 0) {
      const [prefix, num] = item.match(/^([A-Z]+)(\d+)$/).slice(1);
      if (!groupedItems[prefix]) groupedItems[prefix] = [];
      groupedItems[prefix].push(Number(num));
    }
  });

  return Object.entries(groupedItems).flatMap(([prefix, nums]) => {
    nums.sort((a, b) => a - b);
    const first = `${prefix}${nums[0]}`;
    const last = `${prefix}${nums[nums.length - 1]}`;
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
          {Object.entries(viewResultArray).map(([subject, departments]) => (
            <li style={{ fontWeight: "600" }} key={subject}>
              {subject} writing by {getDepartmentDetails(departments)}
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
