export type Doctors = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  duration: number;
  freeTime: string[];
  freeDays: string[];
  selectedTime: string;
  selectedDay: string
}

export type ActiveDoctor ={
  activeDoctor: number;
  selectedDay: string;
  selectedTime: string;
}

