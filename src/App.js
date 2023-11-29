import { createContext, useState } from "react";
import "./App.css";
import Router from "./Components/Router/Router";
import Header from "./Components/Header/Header";
import Suggestion from "./Components/Suggestion/Suggestion";


export const LoginConext = createContext({});

  function App() {
    const [isLoading,setIsLoading]=useState(true);
    const [loginAuth, setLoginAuth] = useState(false);
   fetch(`/auth`)
  .then(res=>res.json())
  .then((res)=>{
    setLoginAuth(res.auth);
    if (res) {
      setIsLoading(false);
    }
  });



  //  console.log(userId)
    
  
  return (
  <LoginConext.Provider value={[loginAuth, setLoginAuth]}>
    
    <div className="App">
      
          {
            isLoading===true ? 
            <div className="loder">
            <div className="ring"></div>
            </div>
             :
             <div className="start">
                  {
                      loginAuth ? (
                      <div className="leftSite">
                        <Header/>
                      </div>
                  ):''
                    }
                    <div className={loginAuth ?"middleSite":''}>
                      <Router />
                    </div>
                    {
                      loginAuth ? (
                        <div className="rightSite">
                         <Suggestion/>
                        </div>
                      ):''
                    }
             </div>
          }

    </div>
  
  </LoginConext.Provider>
  );
}

export default App;
