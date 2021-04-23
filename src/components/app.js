import Calendar from './calendar'
import AppointmentContextProvider from '../context/appointment-context';
import "./app.css";
const App = () => {
  return (

    <AppointmentContextProvider>

      <Calendar />
    </AppointmentContextProvider>

  );
}

export default App;
