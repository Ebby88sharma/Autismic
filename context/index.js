import { createContext, useEffect, useState } from "react";
import { useContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContextAPI = createContext({});

export const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(""); // AsyncStorage.getItem("user")
  const [progress, setProgress] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [QuestionsCompleted, setQuestionsCompleted] = useState(AsyncStorage.getItem(user?.email)); //

  const reFetchStorage = async () => {
    const res = await AsyncStorage.getItem(user.email);
    setQuestionsCompleted(res);
  };

  const reFetchUser = async () => {
    const res = await AsyncStorage.getItem("user");
    setUserId(res);
  };

  useEffect(() => {
    reFetchStorage();
    // reFetchUser();
  }, [user?.email]);

  const [answers, setAnswers] = useState({});
  const ContextValues = useMemo(
    () => ({
      progress,
      userId,
      setUserId,
      user,
      setUser,
      setProgress,
      answers,
      setAnswers,
      isAuth,
      setIsAuth,
      QuestionsCompleted,
      setQuestionsCompleted,
      reFetchStorage,
    }),
    [progress, isAuth, answers, reFetchStorage, QuestionsCompleted, userId]
  );
  return (
    <ContextAPI.Provider value={ContextValues}>{children}</ContextAPI.Provider>
  );
};

export const useContextValue = () => useContext(ContextAPI);
