import { useState, useEffect , createContext , useContext } from "react";
import {authStateChangedListener, getUserDataFromFireStore} from '../utilities/firebase.utilities';




const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const unsubscribe = authStateChangedListener(async (authUser) => {

      if (authUser) {
            
            setUid(authUser.uid);
            const data = await getUserDataFromFireStore(authUser);
            if (data !== null) setUser({...data}) 
            else setUser(null)

      } else {
        
        setUid(null);
        setUser(null);
      }

    });

    return () => unsubscribe();

  }, [refresh]);

  const forceRefresh = () => setRefresh(prevRefresh => !prevRefresh);

  return (

    <UserContext.Provider value={{uid, user, setUser, forceRefresh }}>
      {children}
    </UserContext.Provider>

  );
  
};