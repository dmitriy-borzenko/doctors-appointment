import { IonContent, IonPage } from '@ionic/react';
import firebase from '../firebase/firebase';
import { useEffect } from 'react';
import { Card } from '../components/Card/Card';
import { DateSection } from '../components/DateSection/DateSection';
import { TimeSection } from '../components/TimeSection/TimeSection';
import './Home.css';
import { ActiveDoctor } from '../types';
import { setDay, setDoctor, setTime } from '../redux/doctorSlice';
import { DisplaySection } from '../components/DisplaySection/DisplaySection';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOneDoctor = async () => {
      const db = firebase.firestore();
      const data = await db.collection("doctors").doc("doctor").get();
      const { activeDoctor, selectedDay, selectedTime } = data.data() as ActiveDoctor;
      dispatch(setDoctor(activeDoctor));
      dispatch(setTime(selectedTime));
      dispatch(setDay(selectedDay));
    }
    fetchOneDoctor();
  }, []);

  return (
    <IonPage className="ion-padding">
      <IonContent fullscreen>
        <Card />
        <DateSection />
        <TimeSection />
        <DisplaySection />
      </IonContent>
    </IonPage>
  );
};

export default Home;


