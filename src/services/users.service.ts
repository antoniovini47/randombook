import { getConfig } from "@/lib/config";
import axios from "axios";
import { SearchParams } from "@/types/user";

const ramdomUserBaseURL: string | URL = getConfig("ramdomUserBaseURL");

export async function searchUsers(searchParams: SearchParams) {
  const url = new URL(ramdomUserBaseURL);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(","));
      } else {
        url.searchParams.append(key, value.toString());
      }
    }
  });

  const response = await axios.get(url.toString());

  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }

  return response.data;
}
