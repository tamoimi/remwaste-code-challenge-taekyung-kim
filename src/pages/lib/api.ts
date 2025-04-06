import axios from "axios";
import { Skip } from "../types/skip-type";


const API_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

export function fetchSkips(): Promise<Skip[]> {
  return axios.get<Skip[]>(API_URL).then((res) => res.data);
}
