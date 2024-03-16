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

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

function App() {
  const {
    components: { Counter },
    systemCalls: { increment },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

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
        }}
      >
        <div>
          Counter: <span>{counter?.value ?? "??"}</span>
        </div>
        <button
          type="button"
          onClick={async (event) => {
            event.preventDefault();
            console.log("new counter value:", await increment());
          }}
        >
          Increment
        </button>
      </div>

      {ui}
      {/* Render HelperButtonGroup if no dialogs are opened. */}
    </Backdrop>
  );
}

export default App;
