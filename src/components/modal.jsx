import { useContext, useState } from "react";
import { AppointmentReducerContext } from "../context/appointment-context";

const Modal = ({ appointment, closeModal, date }) => {
  const [comment, setComment] = useState(appointment?.comment || "");

  const dispatch = useContext(AppointmentReducerContext);

  const handleAddAppointment = () => {
    dispatch({ type: "ADD_APPOINTMENT", date, comment });
  };

  const handleDeleteAppointment = () => {
    dispatch({ type: "DELETE_APPOINTMENT", id: appointment.id });
  };

  const handleUpdateAppointment = () => {
    dispatch({ type: "UPDATE_APPOINTMENT", id: appointment.id, comment });
  };

  return (
    <div className="modal-container">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="appointment-modal">
        <h2>
          {appointment ? "Izmjeni ili obriši termin" : "Rezerviraj termin"}
        </h2>
        <p className="modal-appointment-time">{`${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}. - ${date.getHours()}:${
          date.getMinutes() === 0 ? "00" : "30"
        }`}</p>

        <label htmlFor="comment">Komentar:</label>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          id="comment"
        />
        <div className="modal-buttons-container">
          {!appointment && (
            <button onClick={handleAddAppointment}>Rezerviraj</button>
          )}
          {appointment && (
            <button onClick={handleUpdateAppointment}>Izmjeni</button>
          )}

          {appointment && (
            <button onClick={handleDeleteAppointment}>Obriši</button>
          )}
        </div>
        <button className="close-modal-button" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};
export default Modal;
