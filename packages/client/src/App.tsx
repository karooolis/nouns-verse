import React from "react";
import styled from "styled-components";

import { useAppSelector } from "./hooks";

import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import ComputerDialog from "./components/ComputerDialog";
import WhiteboardDialog from "./components/WhiteboardDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import Chat from "./components/Chat";
import MobileVirtualJoystick from "./components/MobileVirtualJoystick";
import { useComponentValue } from "@latticexyz/react";
import { singletonEntity } from "@latticexyz/store-sync/recs";

import { useMUD } from "./MUDContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

function App() {
  const {
    components: {
      Counter,
      WaterLastAt,
      MeditationLastAt,
      ExerciseLastAt,
      FocusLastAt,
    },
    systemCalls: { increment, water, meditate, exercise, focus },
  } = useMUD();

  // Get account form dynamic wallet
  // const { account } = useDynamicWallet();
  const context = useDynamicContext();

  const counter = useComponentValue(Counter, singletonEntity);
  const waterAt = useComponentValue(WaterLastAt, singletonEntity);
  const meditationAt = useComponentValue(MeditationLastAt, singletonEntity);
  const exerciseAt = useComponentValue(ExerciseLastAt, singletonEntity);
  const focusAt = useComponentValue(FocusLastAt, singletonEntity);

  const currentTimestamp = new Date().getTime();

  console.log(waterAt?.value);
  console.log(meditationAt?.value);
  console.log(exerciseAt?.value);
  console.log(focusAt?.value);

  // console.log(waterAt?.value / 1000);

  //////

  const currentTimestampInSeconds = Math.floor(currentTimestamp / 1000);

  const unixTimestamp = waterAt?.value;
  const waterAtDate = new Date(Number(unixTimestamp) * 1000);

  console.log(
    currentTimestampInSeconds,
    Number(waterAt?.value),
    currentTimestampInSeconds - Number(waterAt?.value)
  );

  // Format the date. You can customize the string according to your needs
  // This example uses toLocaleString for a more readable format
  // const formattedDate = date.toLocaleString("en-US", {
  //   weekday: "long", // "Monday"
  //   year: "numeric", // "2022"
  //   month: "long", // "January"
  //   day: "numeric", // "1"
  //   hour: "2-digit", // "00"
  //   minute: "2-digit", // "00"
  //   second: "2-digit", // "00"
  // });

  // console.log(formattedDate);

  ///////

  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const computerDialogOpen = useAppSelector(
    (state) => state.computer.computerDialogOpen
  );
  const whiteboardDialogOpen = useAppSelector(
    (state) => state.whiteboard.whiteboardDialogOpen
  );
  const videoConnected = useAppSelector((state) => state.user.videoConnected);
  const roomJoined = useAppSelector((state) => state.room.roomJoined);

  let ui: JSX.Element;
  if (loggedIn) {
    if (computerDialogOpen) {
      /* Render ComputerDialog if user is using a computer. */
      ui = <ComputerDialog />;
    } else if (whiteboardDialogOpen) {
      /* Render WhiteboardDialog if user is using a whiteboard. */
      ui = <WhiteboardDialog />;
    } else {
      ui = (
        /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
        <>
          <Chat />
          {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
          {!videoConnected && <VideoConnectionDialog />}
          <MobileVirtualJoystick />
        </>
      );
    }
  } else if (roomJoined) {
    /* Render LoginDialog if not logged in but selected a room. */
    ui = <LoginDialog />;
  } else {
    /* Render RoomSelectionDialog if yet selected a room. */
    ui = <RoomSelectionDialog />;
  }

  return (
    <Backdrop>
      <div
        style={{
          position: "fixed",
          top: 15,
          left: 15,
          display: context.isAuthenticated ? "block" : "none",
        }}
      >
        {/* <div>
          Counter: <span>{counter?.value ?? "??"}</span>
        </div> */}

        {/* <div> */}
          <button
            type="button"
            style={{ marginRight: 10 }}
            onClick={async (event) => {
              event.preventDefault();
              console.log("new counter value:", await water());
            }}
          >
            Drink water
          </button>
        {/* </div> */}

        {/* <div> */}
          <button
            type="button"
            style={{ marginRight: 10 }}
            onClick={async (event) => {
              event.preventDefault();
              console.log("new counter value:", await meditate());
            }}
          >
            Meditate
          </button>
        {/* </div> */}

        <button
          type="button"
          style={{ marginRight: 10 }}
          onClick={async (event) => {
            event.preventDefault();
            console.log("new counter value:", await exercise());
          }}
        >
          Exercise
        </button>

        <button
          type="button"
          style={{ marginRight: 10 }}
          onClick={async (event) => {
            event.preventDefault();
            console.log("new counter value:", await focus());
          }}
        >
          Focus
        </button>

        <button
          type="button"
          style={{ marginRight: 10 }}
          onClick={async (event) => {
            event.preventDefault();
            console.log("new counter value:", await focus());
          }}
        >
          Collect gold
        </button>
      </div>

      {ui}
      {/* Render HelperButtonGroup if no dialogs are opened. */}
    </Backdrop>
  );
}

export default App;
