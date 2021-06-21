import React from 'react'
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/react';
import './TimeSection.css';
import { useDispatch, useSelector } from 'react-redux';
import { selDoctor, selTime, setTime } from '../../redux/doctorSlice';


export const TimeSection: React.FC = () => {
  const dispatch = useDispatch();
  const doctor = useSelector(selDoctor);
  const selectedTime = useSelector(selTime);

  const setTimeHandler = (index: number) => {
    dispatch(setTime(doctor.freeTime[index]));
  }

  return (
    <div>
      <IonList className="ion-margin-top ion-margin">
        <IonItem lines="none">
          <IonLabel><span className="date-text">Свободное время</span> </IonLabel>
        </IonItem>
        <IonItem lines="none" className="ion-text-center">
          <IonGrid>
            <IonRow>
              {doctor.freeTime.map((time, index) => (
                <IonCol key={index} className="ion-align-self-center">
                  <div key={index} >
                    <IonLabel>
                      <span onClick={() => setTimeHandler(index)}
                        className={`${selectedTime === time ? 'time-selected' : ''} time-text `}>{time}</span>
                    </IonLabel>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
    </div>
  )
}



