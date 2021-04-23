let id = 14;
const appointmentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      id++;
      return [...state, { date: action.date, comment: action.comment, id: id }];

    case "DELETE_APPOINTMENT":
      return state.filter((appointment) => appointment.id !== action.id);

    case "UPDATE_APPOINTMENT":
      return state.map((appointment) => {
        if (appointment.id === action.id) {
          return {
            date: appointment.date,
            comment: action.comment,
            id: appointment.id,
          };
        }
        return appointment;
      });

    default: {
      throw new Error(`Action type not recognized: ${action.type}`);
    }
  }
};

export default appointmentReducer;
