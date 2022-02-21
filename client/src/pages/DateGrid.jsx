import React from "react";
import moment from "moment";

import { DateBox } from "./DateBox";
import "./datePage.css";

const monthArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const dayLabels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

// Gets the first letter of a month for the header label
const getMonthLetter = (monthNum) =>
  moment().month(monthNum).format("MMM").slice(0, 1);

export default function DateGrid() {

  const loading = false;

  //gql query to load the users data
  const testData = {
    name: 'test',
    email: 'test@email.com',
    moods: [
      {date: "2022-02-19", colour: "#00ff00", description: "Feelin good"},
      {date: "2022-02-20", colour: "#ffff00", description: "Feelin good"},
      {date: "2022-02-22", colour: "#00ff00", description: "Feelin good"},
      {date: "2022-02-23", colour: "#00ff00", description: "Feelin good"},
      {date: "2022-02-24", colour: "#00ffff", description: "Feelin good"},
      {date: "2022-02-25", colour: "#00ff00", description: "Feelin good"},
      {date: "2022-02-26", colour: "#00ffff", description: "Feelin good"},
    ]
  }

  if (loading) {
    return <div>Loading...</div>
  }

  //Function to iterate through the users saved moods and extract the correct one for a day (if it exists)
  const getColourFromUsersMoods = (monthNum, dayNum) => {
    //Converts the month number (0-12) and the daynumber (1-31) into a consistent YYYY-MM-DD format
    const searchString = moment().month(monthNum).date(dayNum).format("YYYY-MM-DD");
    const foundMood = testData.moods.find(moodEntry => moodEntry.date === searchString);

    if (!foundMood) {
      return null
    }

    return foundMood.colour;
  }

  return (
    <div className="dateGrid">

      <div className="monthCol" >
        {/* Dummy box to add a space in the top left corner*/}
        <div className="dayBox filler"></div>

        {/* Create number day labels for left column */}
        {dayLabels.map((dayNum) => (
          <div key={dayNum} className="dayBox label">
            {dayNum}
          </div>
        ))}
      </div>

      {/* Iterates through the months and creates a column for each month*/}
      {monthArray.map((monthNum) => (
        <div className="monthCol" key={monthNum}>

            {/* Prints the month letter title */}
            <div className="dayBox" key={`${monthNum}-title`}>
              {getMonthLetter(monthNum)}
            </div>

            {/* Prints a daybox for each day of each month */}
            {dayLabels.map((dayNum) => (
              <DateBox
                key={`${monthNum}-${dayNum}`}
                monthNum={monthNum}
                dayNum={dayNum}
                colour={getColourFromUsersMoods(monthNum, dayNum)}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
