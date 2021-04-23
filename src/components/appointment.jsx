import { useEffect, useState } from "react";

import editIcon from "../static/icons/edit.svg";
import Modal from "./modal";

const Appointment = ({
  date,
  type,
  appointment = null,
  canReserve = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setModalOpen(false);
    setShowTooltip(false);
  }, [appointment]);

  useEffect(() => {
    setShowTooltip(false);
  }, [modalOpen]);

  const getAppointmentContent = () => {
    if (appointment)
      return (
        <div
          className="appointment-content"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <p>
            {appointment.comment?.length > 15
              ? appointment.comment.substring(0, 15) + "..."
              : appointment.comment}
          </p>
          <img className="edit-icon" src={editIcon} alt="edit" />
        </div>
      );
    if (canReserve && type === "working")
      return (
        <div
          className="appointment-add"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Rezerviraj
        </div>
      );
  };

  return (
    <div
      className={`appointment ${type} ${appointment ? "reserved" : ""} ${
        canReserve && type !== "pause" ? "can-reserve" : ""
      }`}
      onMouseEnter={() => {
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
    >
      {getAppointmentContent()}

      {showTooltip && (
        <div className="tooltip-container">
          {date.getHours() + ":" + (date.getMinutes() === 0 ? "00" : "30")}
        </div>
      )}

      {modalOpen && (
        <Modal
          appointment={appointment}
          closeModal={() => {
            setModalOpen(false);
          }}
          date={date}
        />
      )}
    </div>
  );
};
export default Appointment;
