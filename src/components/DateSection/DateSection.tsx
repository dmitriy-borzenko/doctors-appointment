import { IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow } from '@ionic/react'
import { calendarOutline } from 'ionicons/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selDay, selDoctor, setDay } from '../../redux/doctorSlice';
import './DateSection.css';

export const DateSection: React.FC = () => {
  const dispatch = useDispatch();
  const doctor = useSelector(selDoctor);
  const selectedDay = useSelector(selDay);
  const setDayHandler = (index: number) => {
    dispatch(setDay(doctor.freeDays[index]));
  }
  return (
    <div>
      <IonGrid>
        <IonRow>
          <IonCol className="ion-align-self-center">
            <IonList>
              <IonItem lines="none">
                <IonLabel>
                  <span className="date-text">Возможная дата</span>
                </IonLabel>
                <IonIcon slot="end" icon={calendarOutline}></IonIcon>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
          {doctor.freeDays.map((day, index) => (
            <IonCol key={index}>
              <div className={`${selectedDay === day ? 'selected-border' : ''} container-date-item `}
                onClick={() => setDayHandler(index)}>
                <IonLabel><span className={`${selectedDay === day ? 'selected' : ''} date-week `}>{day.split(',')[0]}</span> </IonLabel>
                <IonLabel><span className={`${selectedDay === day ? 'selected' : ''} date-number `}>{day.split(',')[1]}</span> </IonLabel>
              </div>
            </IonCol>
          ))}
        </IonRow>

      </IonGrid>
    </div>
  )
}
