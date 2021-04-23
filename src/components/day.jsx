import { isSameDay, isSameMinute } from "date-fns";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppointmentStateContext } from "../context/appointment-context";
import {
  calendarDisplayHours,
  workingHours,
} from "../settings/calendar-settings";
import { getAppointmentInDate } from "../utils/appointment-utils";

import Appointment from "./appointment";

const Day = ({ date, canReserve }) => {
  const appointments = useContext(AppointmentStateContext);

  const appointment = getAppointmentInDate(appointments, date);

  const currentDate = useMemo(() => new Date(date), [date]);

  const [canUserReserve, setCanUserReserve] = useState(true);

  useEffect(() => {
    setCanUserReserve(canReserve && !appointment);
  }, [canReserve, appointment]);

  const createDaySchedule = () => {
    const items = [];
    const generateSchedule = (schedule = {}) => {
      const { startTime = 0, endTime = 0, pause = 0 } = schedule;

      //množimo s dva jer termini traju pola sata
      for (
        let i = calendarDisplayHours.min * 2;
        i < calendarDisplayHours.max * 2;
        i++
      ) {
        currentDate.setHours(0, i * 30, 0, 0);
        let type = "";
        const now = new Date();

        if (currentDate < now || isSameDay(currentDate, now)) {
          type = "past";
          items.push(
            <Appointment date={new Date(currentDate)} type={type} key={i} />
          );
        } else if (
          currentDate.getHours() < startTime ||
          currentDate.getHours() >= endTime
        ) {
          type = "non-working";
          items.push(
            <Appointment date={new Date(currentDate)} type={type} key={i} />
          );
        } else {
          const currentAppointment =
            appointment && isSameMinute(appointment.date, currentDate)
              ? appointment
              : null;
          currentDate.getHours() === pause && currentDate.getMinutes() === 0
            ? (type = "pause")
            : (type = "working");
          items.push(
            <Appointment
              date={new Date(currentDate)}
              type={type}
              appointment={currentAppointment}
              canReserve={canUserReserve}
              key={i}
            />
          );
        }
      }
    };

    //Jutarnja smijena za sve parne dane osim nedjeljom
    if (currentDate.getDate() % 2 === 0 && currentDate.getDay() !== 0) {
      generateSchedule(workingHours.morningShift);
    }
    //Popodnedvna smijena za sve neparne dane osim nedjeljom i subotom
    else if (
      currentDate.getDate() % 2 !== 0 &&
      currentDate.getDay() !== 0 &&
      currentDate.getDay() !== 6
    ) {
      generateSchedule(workingHours.afternoonShift);
    }
    //Neradni dan
    else {
      generateSchedule();
    }
    items.push(<div key="empty"></div>);

    return items;
  };

  return <div className="day-container">{createDaySchedule()}</div>;
};

export default Day;
