import { useMemo } from "react";
import { ApiClient } from "./ApiClient.generated";

export const useApiClient = () => {
  return useMemo(() => {
    const API_URI =
      import.meta.env.MODE === "development"
        ? (() => {
            return window.location.origin.startsWith("http://localhost")
              ? "http://localhost:1323"
              : "https://api.visibilityreport.techytechster.com";
          })()
        : "https://api.visibilityreport.techytechster.com";


    return new ApiClient(API_URI);
  }, []);
};

export default useApiClient;
