"use client";

import React from "react";
import { PageWrapper } from "../animationWrapper/pageWrapper";
import { Button, Text, useDisclosure, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import Gamepad from "../../../assets/icons/gamepad.svg";
import Robot from "../../../assets/icons/robot.svg";
import Lottie from "lottie-react";
import animationData from "../../../assets/animations/animation3.json";
import GameModesModal from "./ui/GameModesModal";
import { motion } from "framer-motion";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store/store";
import {
  setSocketState,
} from "@/redux/slices/socket/globalSocketSlice";
import { setModal } from "@/redux/slices/game/gameModalSlice";
import { useRouter } from "next/navigation";
// import waitLoading from "../../../assets/animations/waitLoading.json";
import LodingAnimation from "../../../assets/animations/loadingAnimation.json";

export default function GamePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameType, setGameType] = React.useState("");
  const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  const dispatch = useDispatch<AppDispatch>();
  const socket = useAppSelector((state) => state.globalSocketReducer);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  socket.socket?.on("setIsOwner", (data: { isOwner: boolean, roomId: string }) => {
    dispatch(
      setSocketState({
        socket: socket.socket,
        socketId: socket.socketId,
        isOwner: data.isOwner,
        roomId: data.roomId,
      })
    );
    dispatch(
      setModal({
        mode: "EASY",
        playgroundtheme: {
          id: 1,
          playgroundColor: "bg-black",
          balColor: "bg-white",
        },
        rounds: 3,
        matches: 3,
        backgroundImg: -1,
      })
    );
  });

  socket.socket?.on("playGame", () => {
    // setIsLoading(false);
    router.push("/gamePage/gameFriendPage");
  }
  );

  const handleBotClick = () => {
    setGameType("bot");
    onOpen();
  };

  const handleFriendClick = () => {
    setGameType("friend");
    onOpen();
  };

  const handleMatchmakingClick = () => {
    setIsLoading(true);
    socket.socket?.emit("addPlayerToQueue");
  }

  return (
    <PageWrapper>
      {isLoading && (
      <div className="absolute top-0 left-0 w-full h-screen z-20 bg-black opacity-50" >
        <Lottie
          animationData={LodingAnimation}
          className="absolute inset-0 w-full h-full z-10"
        />
      </div>
      )}
      <div className="flex flex-row h-full justify-center items-center mx-[10%]  z-0">
        <div className={`${breakpoint === "base" ? "absolute" : "flex"} flex-col justify-center items-center  P-20 space-y-6 z-10`}>
          <Text className=" flex text-emerald-300 font-bold text-2xl">
            EXPLORE THE GAME
          </Text>
          <Text className=" flex text-black font-bold text-6xl">
            It&apos;s time to enjoy the game
          </Text>
          <div className={`flex flex-col justify-center items-center  space-y-6  mx-auto w-[400px] h-[300px] p-10`}>
            <Button
              colorScheme="teal"
              variant="outline"
              bg="white"
              size="lg"
              width={300}
              leftIcon={
                <Image src={Gamepad} alt="Gamepad" width={25} height={25} />
              }
              onClick={handleFriendClick}
            >
              Play with a friend
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              size="lg"
              width={300}
              leftIcon={
                <Image src={Robot} alt="Robot" width={25} height={25} />
              }
              onClick={handleBotClick}
            >
              Play with a robot
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              size="lg"
              width={300}
              leftIcon={
                <Image src={Gamepad} alt="Gamepad" width={25} height={25} />
              }
              onClick={handleMatchmakingClick}
            >
              Play with a random player
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Lottie
            animationData={animationData}
            className={`w-full h-[900px] border-2 border-white rounded-[100%] shadow-xl min-w-[370px] ${breakpoint === "base" ? "opacity-20" : ""}`} 
          />
        </motion.div>
      </div>
      <GameModesModal
        isOpen={isOpen}
        onClose={onClose}
        gameType={gameType as "bot" | "friend"}
      />
    </PageWrapper>
  );
}
