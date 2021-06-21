import { IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonRow, IonSlide, IonSlides, IonThumbnail } from '@ionic/react'
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeDoctor, allDoctors, setDoctor } from '../../redux/doctorSlice';
import './Card.css';

export const Card: React.FC = () => {

  const slidesRef = useRef<HTMLIonSlidesElement>(null);
  const dispatch = useDispatch();
  const selectedDoctor = useSelector(activeDoctor);
  const doctors = useSelector(allDoctors);
  const slideOpts = {
    initialSlide: selectedDoctor,
    speed: 200
  };

  useEffect(() => {
   dispatch(setDoctor(selectedDoctor));
   slidesRef.current?.slideTo(selectedDoctor);
  }, [selectedDoctor])

  const onIonSlideDidChangeHandler = (event: any) => {
    event.target.getActiveIndex().then((index: number) => {
      dispatch(setDoctor(index));
    });
  }

  return (
    <div scroll-y="false">
      <IonSlides
       options={slideOpts}
        ref={slidesRef} onIonSlideDidChange={onIonSlideDidChangeHandler}>
        {doctors.map((doctor) => (
          <IonSlide key={doctor.id}>
            <IonCard className="card ">
              <IonCardTitle className="ion-text-center title-text">{doctor.firstName} {doctor.lastName}</IonCardTitle>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonImg className="image" src={doctor.image}></IonImg>
                    </IonCol>
                    <IonCol>
                      <p className="ion-text-center padding-vertical text-duration">Длительность консультации</p>
                      <p className="ion-text-center"><span className="text-duration-bold">{doctor.duration} минут</span></p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonSlide>
        )
        )}
      </IonSlides>

    </div>
  )
}
