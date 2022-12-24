import React, { useState } from "react";
import "../scssfiles/ProfileBar.scss";
import p1 from "../pictures/profilepicone.jpg";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import {
  faAngleDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileBarsublistone } from "../datafile/Datafilesone.js";
import { profileBarsublisttwo } from "../datafile/Datafilesone.js";
import { profileBarsublistonesecond } from "../datafile/Datafilesone.js";
import { profileBarsublisttwosecond } from "../datafile/Datafilesone.js";

function ProfileBar() {
  const [emptyTitleval, setemptyTitleval] = useState(true);
  const [ProfileBarsublistonef, setProfileBarsublistonef] =
    useState(ProfileBarsublistone);

  // if  emptyTitleval is true, two array will add by spread operator otherwise  ProfileBarsubonlistone only
  const emptyTitle = () => {
    setemptyTitleval(!emptyTitleval);
    setProfileBarsublistonef(
      emptyTitleval
        ? [...ProfileBarsublistone, ...profileBarsublistonesecond]
        : ProfileBarsublistone
    );
  };

  const [RecentlyTitleval, setRecentlyTitleval] = useState(true);
  const [ProfileBarsublisttwof, setProfileBarsublisttwof] =
    useState(profileBarsublisttwo);

  // if  emptyTitleval is true, two array will add by spread operator otherwise  profileBarsublisttwo only
  const RecentlyTitle = () => {
    setRecentlyTitleval(!RecentlyTitleval);
    setProfileBarsublisttwof(
      RecentlyTitleval
        ? [...profileBarsublisttwo, ...profileBarsublisttwosecond]
        : profileBarsublisttwo
    );
  };

  return (
    <div className="Profilebar">
      <div className="profilebar__profileIcon">
        <img src={p1} alt="SDKN" className="Avatar" />
        <span className="name">Arun</span>
      </div>
      <div>
        {ProfileBarsublistonef.map((profileBarsublistone, index) => (
          <div className="profilebarsublist" key={index}>
            <div>
              <FontAwesomeIcon
                icon={profileBarsublistone.icon}
              ></FontAwesomeIcon>
            </div>
            <div className="profilebarsublist__number">
              <div>{profileBarsublistone.text}</div>
              <div>{profileBarsublistone.number}</div>
            </div>
          </div>
        ))}
        <button className="seemore" onClick={emptyTitle}>
          {emptyTitleval ? (
            <div>
              seemore <FontAwesomeIcon icon={faChevronDown} />
            </div>
          ) : (
            <div>
              seeless <FontAwesomeIcon icon={faChevronUp} />
            </div>
          )}
        </button>
      </div>
      <div>
        <div className="recentlyadded ">Recently added :</div>
        {ProfileBarsublisttwof.map((profileBarsublisttwo, index) => (
          <div className="profilebarsublist" key={index}>
            <div>
              <FontAwesomeIcon
                icon={profileBarsublisttwo.icon}
              ></FontAwesomeIcon>
            </div>
            <div className="profilebarsublist__number">
              <div>{profileBarsublisttwo.text}</div>
              <div>{profileBarsublisttwo.number}</div>
            </div>
          </div>
        ))}
        <button className="seemore" onClick={RecentlyTitle}>
          {RecentlyTitleval ? (
            <div>
              seemore <FontAwesomeIcon icon={faChevronDown} />
            </div>
          ) : (
            <div>
              seeless <FontAwesomeIcon icon={faChevronUp} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProfileBar;
