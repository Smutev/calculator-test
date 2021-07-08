export interface FormInterface {
  sum: number;
  term: {
    type: "days" | "week";
    value: number;
  };
}
