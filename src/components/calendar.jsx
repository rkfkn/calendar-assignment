import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";
import { calendarDisplayHours } from "../settings/calendar-settings";
import Week from "./week";
import arrow from "../static/icons/arrow.svg";

const Calendar = () => {
  const [date, setDate] = useState(addDays(new Date(), 1));

  const handleChangeToNextWeek = () => {
    setDate(addDays(date, 7));
  };

  const handleChangeToPreviousWeek = () => {
    if (date.getTime() <= addDays(Date.now(), 1)) return;
    setDate(addDays(date, -7));
  };

  const createDayLabels = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const currentDate = startOfWeek(date, { weekStartsOn: 1 });
    currentDate.setDate(currentDate.getDate() - 1);
    return days.map((day) => {
      currentDate.setDate(currentDate.getDate() + 1);
      return (
        <div className="date-label" key={day}>
          <span className="date">{currentDate.getDate()}</span>
          <span className="day">{day}</span>{" "}
        </div>
      );
    });
  };

  const createHourLabels = () => {
    const items = [];
    for (let i = calendarDisplayHours.min; i < calendarDisplayHours.max; i++) {
      items.push(
        <div key={i}>{i + ":00"}</div>,
        <div key={i + ":30"}>{i + ":30"}</div>
      );
    }
    items.push(
      <div key={calendarDisplayHours.max}>
        {calendarDisplayHours.max + ":00"}
      </div>
    );
    return items;
  };

  const createDateRangeString = () => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    return (
      <span className="date-range-string">
        {`${weekStart.getDate()}. - 
    ${weekEnd.getDate()}. ${weekEnd.getMonth() + 1}. ${weekEnd.getFullYear()}.`}
      </span>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Office hours calendar</h1>
        <p>
          It is possible to choose up to a maximum of 2 appointments per week,
          and up to 1 appointment per day.
        </p>
        <div className="color-meani ng">
          <div>
            <div className="non-working"></div>
            <span>Not working</span>
          </div>
          <div>
            <div className="working"></div>
            <span>Free, unable to reserve</span>
          </div>
          <div>
            <div className="working can-reserve"></div>
            <span>Free</span>
          </div>
          <div>
            <div className="pause"></div>
            <span>Pause</span>
          </div>
          <div>
            <div className="reserved"></div>
            <span>Reserved</span>
          </div>
        </div>
        <h3 className="calendar-date">
          {createDateRangeString()}
          <img
            className={`arrow-left ${
              date.getTime() <= addDays(Date.now(), 1) ? "disabled" : ""
            }`}
            onClick={handleChangeToPreviousWeek}
            src={arrow}
            alt="previous"
          />
          <img
            className="arrow-right"
            onClick={handleChangeToNextWeek}
            src={arrow}
            alt="next"
          />
        </h3>
      </div>
      <div className="calendar-body">
        <div className="calendar-main">
          <div className="calendar-day-labels">{createDayLabels()}</div>
          <div className="calendar-data-container">
            <div className="calendar-hour-labels">{createHourLabels()}</div>
            <div className="calendar-data">
              <Week containsDate={date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
