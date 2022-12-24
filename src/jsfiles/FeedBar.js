import React, { useEffect } from "react";
import arunProfile from "../pictures/profilepicone.jpg";
import withoutProfile from "../pictures/withoutprofile.jpg";
import "../scssfiles/ProfileBar.scss";
import "../scssfiles/FeedBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faCamera,
  faMicrophone,
  faPaperPlane,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { ReactMediaRecorder } from "react-media-recorder";
import { defaultmessage } from "../datafile/Datafilesone";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment/moment";

function FeedBar() {
  //when local storage delete completely map function can't run then it show error
  if (JSON.parse(localStorage.getItem("Feed")) == null) {
    localStorage.setItem("Feed", JSON.stringify(defaultmessage));
  }

  var username = "arun";
  var jobrole = "Marketing Expert";

  //If local storage is empty map function wont render that's why initalize feeddata with localstorage
  const [feeddata, setfeeddata] = useState(
    JSON.parse(localStorage.getItem("Feed"))
  );

  //for message ,Message from textarea will automatically update in message variable by using setmessage
  const [message, setmessage] = useState("");
  const handleChangemessage = (event) => {
    setmessage(event.target.value);
  };

  //for attachment
  const [allowattachment, setallowattachment] = useState(false);
  const handleChangeallowattachment = () => {
    setallowattachment(!allowattachment);
    setallowpic(false);
    setallowmic(false);
  };

  const [attachfile, setattachfile] = useState(null);
  const [filetype, setfiletype] = useState(" ");
  const [filename, setfilename] = useState(" ");

  //update filename and filetype
  const handleChangefile = (event) => {
    setattachfile(event.target.files[0]);
    setfilename(event.target.files[0].name);
    setfiletype(event.target.files[0].type);
  };

  const deleteattachment = () => {
    setallowattachment(false);
    setattachfile(null);
    setfiletype(null);
  };

  //getbase64
  const getBase64 = (attachfile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(attachfile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (attachfile !== null) {
    getBase64(attachfile).then((blob) => {
      setattachfile(blob);
    });
  }
  //for webcam , While click the capture it, webcam will appear othewrwise not.
  const [allowpic, setallowpic] = useState(false);
  const handleChangeallowpic = () => {
    setallowpic(!allowpic);
    setallowattachment(false);
    setallowmic(false);
    setcamerapic(null);
  };

  //For capturing picture using webcam at spot
  const webref = useRef(null);
  const [camerapic, setcamerapic] = useState(null);
  const handleChangecapture = () => {
    setcamerapic(webref.current.getScreenshot());
  };

  const deletecapturedpic = () => {
    setcamerapic(null);
  };

  //formic, While click the capture it,mic will appear othewrwise not.
  const [allowmic, setallowmic] = useState(false);
  const handleChangeallowmic = () => {
    setallowmic(!allowmic);
    setallowattachment(false);
    setallowpic(false);
  };

  //set recorded value in micvalue
  const [micvalue, setmicvalue] = useState(null);
  const sendrecording = (event) => {
    setmicvalue(event.target.value);
  };

  const deleterecordmic = () => {
    setmicvalue(null);
  };
  //whenever calls this arrow function object will automatically concatenate in feeddata
  const setvalues = () => {
    setfeeddata(
      feeddata.concat({
        name: username,
        jobrole: jobrole,
        date: moment().format(),
        message: message,
        file: attachfile,
        filetype: filetype,
        filename: filename,
        capture: camerapic,
        audio: micvalue,
      })
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (message == " ") {
      if (window.confirm("Message is empty")) {
        setvalues();
      }
    } else {
      setvalues();
    }
    callFunctions();
  };

  //this arrow function called by everytime when hit a send button
  const callFunctions = () => {
    setmessage(" ");
    setallowattachment(false);
    setattachfile(null);
    setallowpic(false);
    setcamerapic(null);
    setallowmic(false);
    setmicvalue(null);
    setfiletype(null);
  };

  //here delete option and which index wants to delete in array will update
  const [showdelete, setshowddelete] = useState(false);
  const [showdeletevalue, setshowddeletevalue] = useState(null);
  const showdeleteoption = (value) => {
    setshowddelete(!showdelete);
    setshowddeletevalue(value);
  };

  //selected index will delete by using splice function
  const deletepost = (value) => {
    const deletedata = feeddata;
    if (window.confirm("Do you want delete this message?")) {
      deletedata.splice(value, 1);
      setfeeddata([...deletedata]);
      setshowddelete(!showdelete);
      showdeletevalue(null);
    }
  };

  //value from the feeddata is converted to stringify and then it will update here
  localStorage.setItem("Feed", JSON.stringify(feeddata));
  const feed = JSON.parse(localStorage.getItem("Feed"));
  const feedindex = feed.length - 1;

  return (
    <div className="feedbar">
      <div className="feedbar__inputbar">
        <div className="feedbar__inputbar__logobar">
          <img src={arunProfile} alt="SDKN" className="Avatar" />
          <TextareaAutosize
            autoFocus
            minRows={1}
            maxRows={5}
            className="feedbar__input"
            value={message}
            onChange={handleChangemessage}
            placeholder="share something here..."
          />
          <div className="sendButton">
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={handleChange}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="feedbar__icontext">
          <div className="feedbar__addattachment">
            <button
              className="feedbar__addattachment__but"
              onClick={handleChangeallowattachment}
            >
              <FontAwesomeIcon
                icon={faVideo}
                className="feedbar__icon"
              ></FontAwesomeIcon>
              Any attachment
            </button>
          </div>

          <div className="feedbar__addattachment">
            <button
              className="feedbar__addattachment__but"
              onClick={handleChangeallowpic}
            >
              <FontAwesomeIcon
                icon={faCamera}
                className="feedbar__icon"
              ></FontAwesomeIcon>
              Capture it
            </button>
          </div>
          <div className="feedbar__addattachment">
            <button
              className="feedbar__addattachment__but"
              onClick={handleChangeallowmic}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                className="feedbar__icon"
              ></FontAwesomeIcon>
              say it
            </button>
          </div>
        </div>
        {allowattachment && (
          <div className="feedbar__input__attachment">
            <input
              type="file"
              onChange={handleChangefile}
              className="feedbar__input__attachment--input"
            />
            <button
              className="feedbar__input__camera--button"
              onClick={deleteattachment}
            >
              Cancel
            </button>
          </div>
        )}
        {allowpic && (
          <div>
            <div className="feedbar__input__camera">
              <Webcam
                ref={webref}
                className="feedbar__input__camera--captured"
              ></Webcam>
            </div>
            <div className="feedbar__input__camera">
              <button
                onClick={handleChangecapture}
                className="feedbar__input__camera--button"
              >
                {camerapic == null ? (
                  <div>Take Picture</div>
                ) : (
                  <div>Captured</div>
                )}
              </button>
              <button
                onClick={deletecapturedpic}
                className="feedbar__input__camera--button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {allowmic && (
          <ReactMediaRecorder
            audio
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
            }) => (
              <div>
                <div className="feedbar__input__mic--status">{status}</div>
                <div className="feedbar__input__mic--audio">
                  <audio
                    src={mediaBlobUrl}
                    controls
                    loop
                    style={{ position: "relative" }}
                  />
                </div>
                <div className="feedbar__input__mic">
                  <button
                    onClick={startRecording}
                    className="feedbar__input__mic--start"
                  >
                    Start
                  </button>
                  <button
                    onClick={stopRecording}
                    className="feedbar__input__mic--stop"
                  >
                    Stop
                  </button>
                  <button
                    onClick={sendrecording}
                    value={mediaBlobUrl}
                    className="feedbar__input__mic--done"
                  >
                    Submit
                  </button>
                  <button
                    className="feedbar__input__mic--done"
                    onClick={deleterecordmic}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          />
        )}
      </div>

      {feed.map((text, index) => (
        <div className="feedbar__post" key={index}>
          <div className="feedbar__post__avatarbar">
            <img
              src={
                feed[feedindex - index].name == "arun"
                  ? arunProfile
                  : withoutProfile
              }
              alt="SDKN"
              className="feedbar__avatar"
            />
            <div className="feedbar__post__avatarbar__right">
              <div>
                <div className="feedbar__post__avatarbar__right--name">
                  {feed[feedindex - index].name}
                </div>
                <div className="feedbar__post__avatarbar__right--role">
                  {feed[feedindex - index].jobrole}
                </div>
                <div className="feedbar__post__avatarbar__right--date">
                  {moment(feed[feedindex - index].date).fromNow()}
                </div>
              </div>
              <div>
                <div>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => showdeleteoption(feedindex - index)}
                    className="feedbar__post__avatarbar__ellipse"
                  />
                </div>

                <div>
                  {showdelete && showdeletevalue == feedindex - index && (
                    <div>
                      <button
                        onClick={() => deletepost(feedindex - index)}
                        className="feedbar__post__avatarbar__delete"
                      >
                        delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="feedbar__post__content">
            <div className="feedbar__post__content__message">
              {feed[feedindex - index].message}
            </div>
            <div className="feedbar__post__content__filecap">
              {feed[feedindex - index].file &&
                (() => {
                  if (
                    feed[feedindex - index].filetype == "image/jpeg" ||
                    feed[feedindex - index].filetype == "image/png" ||
                    feed[feedindex - index].filetype == "image/jpg"
                  ) {
                    return (
                      <img
                        src={feed[feedindex - index].file}
                        className="feedbar__post__content__file"
                      />
                    );
                  } else {
                    return (
                      <div className="feedbar__post__content__file">
                        <div>
                          <br></br>
                          <a
                            download={feed[feedindex - index].filename}
                            href={feed[feedindex - index].file}
                          >
                            {feed[feedindex - index].filename}
                          </a>
                        </div>
                      </div>
                    );
                  }
                })()}
              {feed[feedindex - index].capture && (
                <img
                  className="feedbar__post__content__cap"
                  src={feed[feedindex - index].capture}
                />
              )}
            </div>
            <div>
              {feed[feedindex - index].audio && (
                <audio
                  src={feed[feedindex - index].audio}
                  controls
                  loop
                  className="feedbar__post__content__audio "
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedBar;
