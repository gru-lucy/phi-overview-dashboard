export type VitalSign = {
  timestamp: string;
};

export type HeartRateEntry = VitalSign & {
  value: number;
};

export type BloodPressureEntry = VitalSign & {
  systolic: number;
  diastolic: number;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  lastVisit: string;
  vitals: {
    heartRate: HeartRateEntry[];
    bloodPressure: BloodPressureEntry[];
  };
  note?: string;
};