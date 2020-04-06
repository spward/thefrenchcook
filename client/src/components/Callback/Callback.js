import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Callback = ({history, setCode}) => {
  useEffect(()=>{
    if(history.location.pathname === '/callback' && history.location.search  && history.location.search.includes('code')){
      const code = history.location.search.replace('?code=','');
      setCode(code);
      history.push('/dashboard');
    };
  })


  return (
  <div>
    <div>You will be redirected in a moment</div>
    </div>
  );
}

export default withRouter(Callback);
