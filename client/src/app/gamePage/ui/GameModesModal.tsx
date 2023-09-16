import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import StartGame from "../../../../assets/icons/startIcon.svg";
import closeIcon from "../../../../assets/icons/closeIcon.svg";
import inviteFriend from "../../../../assets/icons/inviteFriendIcon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setModal } from "@/redux/slices/game/gameModalSlice";
import {
  Modes,
  Rounds,
  Matches,
  PlaygroundTheme,
} from "@/utils/constants/game/GameConstants";
import Lottie from "lottie-react";
import animationData from "../../../../assets/animations/animation1.json";
import levelEasy from "../../../../assets/icons/levelEasy.svg";
import levelMedium from "../../../../assets/icons/levelMedium.svg";
import levelHard from "../../../../assets/icons/levelHard.svg";
import { BackgroundsImg } from "@/utils/constants/game/GameConstants";
import GameSearchFriend from "./GameSearchFriend";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  gameType: string;
};

const getIcon = (mode: string) => {
  switch (mode) {
    case "Easy":
      return levelEasy;
    case "Medium":
      return levelMedium;
    case "Hard":
      return levelHard;
    default:
      return levelEasy;
  }
};

const GameModesModal = ({ isOpen, onClose, gameType }: Props) => {
  const [modeValue, setmodeValue] = useState<string>(Modes[0]);
  const [Playground, setPlayground] = useState(PlaygroundTheme[0]);
  const [rounds, setRounds] = useState<number>(1);
  const [matchesSelected, setMatchesSelected] = useState<number>(1);
  const [canvasBgImg, setCanvasBgImg] = useState<number>(-1);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(
    gameType === "friend"
  );

  const handleModeChange = (mode: string) => {
    setmodeValue(mode);
  };

  const handelStartGame = () => {
    dispatch(
      setModal({
        mode: modeValue,
        playgroundtheme: Playground,
        rounds: rounds,
        matches: matchesSelected,
        backgroundImg: canvasBgImg,
      })
    );

    if (gameType === "friend") {
      setIsSearchModalOpen(true);
    } else if (gameType === "bot") {
      router.push("/gamePage/gameBotPage");
    }
  };

  const handleRadioChange = (id: string) => {
    const selectedTheme =
      PlaygroundTheme.find((theme) => theme.id === Number(id)) ||
      PlaygroundTheme[0];
    setPlayground(selectedTheme);
  };

  const handleBackgroundSelect = (id: number) => {
    setCanvasBgImg(id);
  };

  const modalVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      onCloseComplete={() => setIsSearchModalOpen(false)}
    >
      <ModalOverlay
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(5px)",
        }}
      />
      {!isSearchModalOpen ? (
        <ModalContent
          bg={`rgba(255, 255, 255, 0.95)`}
          className="relative duration-500 ease-in-out rounded-2xl shadow-2xl border-1 border-black flex justify-between items-center bg-gray-100"
        >
          <Lottie
            animationData={animationData}
            className="absolute inset-0 border-2 border-white rounded-[100%] w-full h-full z-[-1] opacity-10 bg-white"
          />
          <ModalHeader>Game Modes</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex justify-between items-center">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row justify-between items-center space-x-5">
                {Modes.map((mode: string) => (
                  <Button
                    key={mode}
                    colorScheme="green"
                    onClick={() => handleModeChange(mode)}
                    className={`rounded-full shadow-xl ${
                      modeValue === mode ? "text-white" : "text-black"
                    } ${modeValue === mode ? "bg-green-500" : "bg-gray-200"}`}
                    variant="solid"
                    leftIcon={
                      <Image
                        src={getIcon(mode)}
                        alt="levelIcon"
                        width={25}
                        height={25}
                      />
                    }
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              <Select
                placeholder="Select game Rounds"
                onChange={(e) => setRounds(Number(e.target.value))}
              >
                {Rounds.map((round) => (
                  <option key={round} value={round}>
                    {round}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Select game Matches for each round"
                onChange={(e) => setMatchesSelected(Number(e.target.value))}
              >
                {Matches.map((match) => (
                  <option key={match} value={match}>
                    {match}
                  </option>
                ))}
              </Select>
              <div className="flex flex-col justify-between space-y-2">
                <Text>Playground Theme</Text>
                <RadioGroup
                  value={Playground.id.toString()}
                  onChange={(id) => handleRadioChange(id)}
                >
                  <div className="flex flex-row justify-between items-center mx-10 space-x-8">
                    {PlaygroundTheme.map((theme) => (
                      <Radio key={theme.id} value={theme.id.toString()}>
                        <div className="relative w-7 h-7">
                          <div
                            className={`w-full h-full rounded-full absolute border-1 border-black ${theme.playgroundColor}`}
                          />
                          <div
                            className={`w-7 h-7 rounded-full absolute top-1/2 left-5 transform -translate-y-1/2 border-1 border-black ${theme.balColor}`}
                          />
                        </div>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col justify-between space-y-2">
                <Text>Playground Background</Text>
                <div className="flex flex-wrap flex-row w-full justify-between items-center max-w-[320px] mx-auto ">
                  {BackgroundsImg.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => handleBackgroundSelect(bg.id)}
                      className={`relative w-16 h-10 rounded-lg border-2 ${
                        canvasBgImg === bg.id
                          ? "bg-green-500 border-green-500"
                          : "border-white"
                      } `}
                    >
                      <Image
                        src={bg.src}
                        alt="background"
                        className={`rounded-lg w-full h-full`}
                      />
                    </button>
                  ))}
                  <button
                    onClick={() => handleBackgroundSelect(-1)}
                    className={`relative w-16 h-10 rounded-lg border-2 text-black ${
                      canvasBgImg === -1 ? "border-green-500" : "border-white"
                    } `}
                  >
                    None
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={onClose}
              leftIcon={
                <Image src={closeIcon} alt="closeIcon" width={25} height={25} />
              }
            >
              Close
            </Button>
            {gameType === "bot" ? (
              <Button
                colorScheme="teal"
                variant="outline"
                leftIcon={
                  <Image
                    src={StartGame}
                    alt="StartGame"
                    width={25}
                    height={25}
                  />
                }
                onClick={handelStartGame}
              >
                Start
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                variant="outline"
                leftIcon={
                  <Image
                    src={inviteFriend}
                    alt="StartGame"
                    width={25}
                    height={25}
                  />
                }
                onClick={handelStartGame}
              >
                Invite Friend
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      ) : (
        <GameSearchFriend onClose={onClose} />
      )}
    </Modal>
  );
};

export default GameModesModal;
