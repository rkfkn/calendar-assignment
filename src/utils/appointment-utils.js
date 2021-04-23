import { addDays, isSameDay, isSameWeek } from "date-fns"
import { workingHours } from "../settings/calendar-settings";

export const getAppointmentInDate = (appointments, date) =>
    appointments.find(appointment => isSameDay(appointment.date, date))

export const getNumberOfAppointmentsInWeek = (appointments, date) =>
    appointments.filter(appointment => isSameWeek(appointment.date, date)).length

export const generateRandomAppointments = (numberOfAppointments, daysRange) => {

    const appointments = []

    for (let i = 0; i < numberOfAppointments; i++) {
        let newDate = new Date()
        let daysOffset = 0

        do {
            daysOffset = Math.ceil(Math.random() * daysRange)
            if (appointments.lenght === 0) break;
        } while (
            // loop while we have already a reservatrion on that day or we already have 2 reservation in that week.
            getAppointmentInDate(appointments, addDays(newDate, daysOffset))
            || getNumberOfAppointmentsInWeek(appointments, addDays(newDate, daysOffset)) >= 2
            // is a working day
            || addDays(newDate, daysOffset).getDay() === 0
            || (addDays(newDate, daysOffset).getDay() === 6 && addDays(newDate, daysOffset).getDate() % 2 !== 0)
        )
        newDate = addDays(newDate, daysOffset)

        let hours = 0;
        let minutes = 0;
        const { startTime, endTime, pause } = newDate.getDate() % 2 === 0 ? workingHours.morningShift : workingHours.afternoonShift

        do {
            // 0 to 7 + startTime
            hours = Math.floor(Math.random() * (endTime - startTime) + startTime)
            // 0 or 1 * 30 
            minutes = Math.floor(Math.random() * 2) * 30;
        } while (hours === pause && minutes === 0)

        newDate.setHours(hours, minutes, 0, 0)

        appointments.push({
            date: newDate,
            comment: `Termin ${i + 1}`,
            id: i,

        })


    }
    return appointments



}