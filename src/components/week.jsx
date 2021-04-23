import { startOfWeek } from "date-fns";
import { useContext, useEffect, useState } from "react";
import Day from "./day";
import { AppointmentStateContext } from "../context/appointment-context";
import { getNumberOfAppointmentsInWeek } from "../utils/appointment-utils";

const Week = ({ containsDate }) => {
  const startDate = startOfWeek(containsDate, { weekStartsOn: 1 });

  const appointments = useContext(AppointmentStateContext);

  const [canUserReserve, setCanUserReserve] = useState(
    getNumberOfAppointmentsInWeek(appointments, startDate) < 2
  );

  useEffect(() => {
    setCanUserReserve(
      getNumberOfAppointmentsInWeek(appointments, startDate) < 2
    );
  }, [appointments, startDate]);

  const createDays = () => {
    const items = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      items.push(
        <Day date={new Date(currentDate)} canReserve={canUserReserve} key={i} />
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return items;
  };

  return createDays();
};

export default Week;
