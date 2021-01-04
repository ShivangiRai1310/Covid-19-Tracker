import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">

        <div className="header__left">
        <img className="header__logo" src="https://firebasestorage.googleapis.com/v0/b/covid-19-tracker-a11f3.appspot.com/o/logo1.png?alt=media&token=7ac72575-c97f-4e28-a8f6-604755f8fc49" alt="brand-logo" />
        </div>

        <div className="header__right">
            <Link to="/worldwide" className="header__link"><h3>Worldwide <br /> Statistics</h3></Link>
            <Link to="/statewise"  className="header__link"><h3>State wise <br /> Statistics</h3></Link>
            <Link to="/countrywise"  className="header__link"><h3>Country wise <br /> Statistics</h3></Link>
        </div>
   

    
      {/* <div class="row text-center" id="banner">
        <div class="col-5 mx-auto px-4">
          <a href="IndiaStats">IndiaLiveCount</a>
          <a href="WorldStats">WorldLiveCount</a>
        </div>
        <div class="col">
          <img src="./images/banner.png" alt="" />
        </div>
      </div>  */}
    </div>
  );
}

export default Header;
