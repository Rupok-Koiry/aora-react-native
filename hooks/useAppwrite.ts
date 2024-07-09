import { Alert } from "react-native";
import { useEffect, useState } from "react";

type UseAppwriteReturnType<T> = {
  data: T[];
  loading: boolean;
  refetch: () => void;
};

const useAppwrite = <T>(fn: () => Promise<T[]>): UseAppwriteReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
