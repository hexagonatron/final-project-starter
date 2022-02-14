import React from "react";
import moment from "moment";
import "./datePage.css";

const monthArray = [0,1,2,3,4,5,6,7,8,9,10,11,12];

const getDaysArray = (monthNum) => {
  const daysInMonth = moment().month(monthNum).daysInMonth();
  return new Array(daysInMonth).fill(1).map((_, i) => i + 1);
};

// Ignore - just used for colouring
const dayInYearByRad = (monthNum, dayNum) => {
  return monthNum * dayNum;
}

// Ignore - just used for colouring
const getSatruationValueFromDayNumber = (dayInYear) => {
  const totalDaysInYear = moment().endOf("year").dayOfYear();
  const percentageThrough = dayInYear / totalDaysInYear;
  const saturation = 360 * percentageThrough;
  return saturation;
}

// Ignore - just used for colouring
const getShadingFunction = () => {
  const shadingFns = [dayInYearByRad];
  const randomShader = shadingFns[Math.floor(Math.random() * shadingFns.length)];
  const shadingFn = (monthNum, dayNum) => {
    const dayInYear = randomShader(monthNum, dayNum);
    return getSatruationValueFromDayNumber(dayInYear);
  }
  return shadingFn;
}

const getMonthLetter = monthNum => moment().month(monthNum).format("MMM").slice(0, 1)

export default function DateGrid() {
  const shadingFn = getShadingFunction();

  return (
    <div className="dateGrid">
      {monthArray.map((monthNum) => (
        <div className="monthCol" key={monthNum}>
          {[
            <div className="dayBox" key={`${monthNum}-title`}>
              {getMonthLetter(monthNum)}
            </div>,
          ].concat(
            getDaysArray(monthNum).map((dayNum) => (
              <div
                className="dayBox"
                key={dayNum}
                style={{
                  backgroundColor: `hsl( ${shadingFn(monthNum,dayNum)}, 75%, 78%)`,
                }}
              >
                {dayNum}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
