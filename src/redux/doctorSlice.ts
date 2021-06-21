import { Doctors } from './../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import firebase from 'firebase';
import { RootState } from './store';

// Define a type for the slice state
export interface AppState {
  selectedDoctor: number,
  doctors: Doctors[];
}

// Define the initial state using that type
const initialState: AppState = {
  selectedDoctor: 0,
  doctors: [
    {
      id: 1,
      firstName: "Василий",
      lastName: "Иванов",
      image: "assets/img/man.png",
      duration: 50,
      freeTime: ["18:00", "18:30", "20:00", "20:30"],
      freeDays: [
        "Сегодня,15",
        "Пт,16",
        "Вт,17",
        "Ср,18",
      ],
      selectedTime: "",
      selectedDay: ""
    },
    {
      id: 2,
      firstName: "Елена",
      lastName: "Шимановская",
      image: "assets/img/women.png",
      duration: 45,
      freeTime: ["9:00", "10:30", "12:00", "13:30"],
      freeDays: [
        "Сегодня,25",
        "Пт,26",
        "Вт,27",
        "Ср,28",
      ],
      selectedTime: "",
      selectedDay: ""
    }
  ]
}

export const getOneDoctor = createAsyncThunk(
  'doctor/getOneDoctor',
  async () => {
    const db = firebase.firestore();
    const data = await db.collection("doctors").doc("doctor").get();
    console.log("data");

    return data.data();
  });



export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctor: (state, { payload }: PayloadAction<number>) => {
      state.selectedDoctor = payload
    },
    setTime: (state, { payload }: PayloadAction<string>) => {
      state.doctors[state.selectedDoctor].selectedTime = payload
    },
    setDay: (state, { payload }: PayloadAction<string>) => {
      state.doctors[state.selectedDoctor].selectedDay = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneDoctor.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.selectedDoctor = payload.activeDoctor;
      state.doctors[payload.activeDoctor].selectedDay = payload.selectedDay;
      state.doctors[payload.activeDoctor].selectedTime = payload.selectedTime;
      console.log(payload);

    });
  }


});

export const { setDoctor, setDay, setTime } = doctorSlice.actions

export const selDoctor = (state: RootState) => state.doctor.doctors[state.doctor.selectedDoctor]
export const selTime = (state: RootState) => state.doctor.doctors[state.doctor.selectedDoctor].selectedTime;
export const selDay = (state: RootState) => state.doctor.doctors[state.doctor.selectedDoctor].selectedDay;
export const activeDoctor= (state: RootState) => state.doctor.selectedDoctor;
export const allDoctors = (state: RootState) => state.doctor.doctors;
// Other code such as selectors can use the imported `RootState` type


export default doctorSlice.reducer