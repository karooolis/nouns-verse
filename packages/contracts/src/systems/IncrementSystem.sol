// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import {System} from "@latticexyz/world/src/System.sol";
import {Counter, MeditationLastAt, ExerciseLastAt, WaterLastAt, FocusLastAt} from "../codegen/index.sol";

contract IncrementSystem is System {
    function meditate() public returns (uint256) {
        MeditationLastAt.set(block.timestamp);
        return block.timestamp;
    }

    function exercise() public returns (uint256) {
        ExerciseLastAt.set(block.timestamp);
        return block.timestamp;
    }

    function water() public returns (uint256) {
        WaterLastAt.set(block.timestamp);
        return block.timestamp;
    }

    function focus() public returns (uint256) {
        FocusLastAt.set(block.timestamp);
        return block.timestamp;
    }

    function increment() public returns (uint32) {
        uint32 counter = Counter.get();
        uint32 newValue = counter + 1;
        Counter.set(newValue);
        return newValue;
    }
}
