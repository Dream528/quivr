import axios, { AxiosError, AxiosInstance } from "axios";

import { useBrainConfig } from "../context/BrainConfigProvider/hooks/useBrainConfig";
import { useSupabase } from "../context/SupabaseProvider";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}`,
});

export const useAxios = (): { axiosInstance: AxiosInstance } => {
  const { session } = useSupabase();
  const {
    config: { backendUrl, openAiKey },
  } = useBrainConfig();
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${session?.access_token ?? ""}`;
      config.headers["Openai-Api-Key"] = openAiKey;
      config.baseURL = backendUrl ?? config.baseURL;

      return config;
    },
    (error: AxiosError) => {
      console.error({ error });
      void Promise.reject(error);
    }
  );

  return {
    axiosInstance,
  };
};
