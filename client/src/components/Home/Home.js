import React from "react";
import { withRouter } from "react-router-dom";

const Home = ({userInfo, history}) => (
  <div>
    <div>
      <h3>
        TheFrenchCook Login
      </h3>
    </div>
    <div>
      {(userInfo && userInfo.email) ? (
        <button onClick={()=>history.push('/dashboard')}>Go to dashbord</button>
      ): 
      (<a href="http://localhost:9000/login">Login through Discord</a>)}
      
    </div>
  </div>
);

export default withRouter(Home);
