import { createContext, useReducer } from "react";
import { generateRandomAppointments } from "../utils/appointment-utils";
import appointmentReducer from "./reducers/appointment-reducer";

export const AppointmentStateContext = createContext();
export const AppointmentReducerContext = createContext();

const AppointmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appointmentReducer,
    generateRandomAppointments(15, 90)
  );

  return (
    <AppointmentReducerContext.Provider value={dispatch}>
      <AppointmentStateContext.Provider value={state}>
        {children}
      </AppointmentStateContext.Provider>
    </AppointmentReducerContext.Provider>
  );
};

export default AppointmentContextProvider;
