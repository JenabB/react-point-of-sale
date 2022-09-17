import { format } from "fecha";

const formatDate = (date: string) => {
  return format(new Date(date), "D MMM YYYY");
};

export default formatDate;
