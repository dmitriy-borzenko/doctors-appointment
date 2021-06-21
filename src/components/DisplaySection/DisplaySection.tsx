import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react'
import firebase from 'firebase';
import React from 'react'
import { useSelector } from 'react-redux';
import { activeDoctor, selDay, selTime } from '../../redux/doctorSlice';
import './DisplaySection.css';

export const DisplaySection: React.FC = () => {

  const selectedDoctor = useSelector(activeDoctor);
  const selectedDay = useSelector(selDay);
  const selectedTime = useSelector(selTime);

  const onClickHandler = () => {
    const db = firebase.firestore();
    const data = db.collection("doctors").doc("doctor")
      .set({ selectedDay, selectedTime, activeDoctor: selectedDoctor });
  }
  return (
    <>
      <IonGrid className="date-week">
        <IonRow className="ion-text-center">
          <IonCol size="6" className="left">
            Дата <br />
            <span className="date-bold">{selectedDay}</span>
          </IonCol>
          <IonCol size="6">
            Время <br />
            <span className="date-bold">{selectedTime}</span>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="ion-text-center ion-padding-top ">
        <IonButton color="secondary" onClick={onClickHandler}>Записаться на бесплатную встречу</IonButton>
      </div>
    </>
  )
}
