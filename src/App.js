import './App.css';
import SignUp from './pages/SignUp';
import Notification from './components/Notifications';
import { useSelector } from 'react-redux';



function App() {

  const showNotification = useSelector((state) => state.ui.isShowNotification);

  return (
    <div>
      {showNotification && <Notification />}
      <SignUp />
    </div>
  );
}

export default App;
