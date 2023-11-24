'use client';

import React, { useEffect, useState } from "react";
import AddToFriendList from '@/../assets/icons/AddToFriendList.svg'
import Remove from "@/../assets/icons/remove-friend.svg";
import pending from "@/../assets/icons/pending.svg";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store/store";











export default function AddFriend({ userId }: { userId: string }) {
//   const User = useSelector((state: any) => state.chat.selectedChannelorUser);
  const socket = useSelector((state: any) => state.socket.socket);

  const selected = useSelector(
    (state: any) => state.chat.selectedChannelorUser
  );

  const allOptImages = useAppSelector(
    (state: any) => state.optImages.optImages
  );

  const [optImages, setOptImages] = useState([
    { src: AddToFriendList, alt: "Add to friend list" }
  ]);

  useEffect(() => {
    const getSelectedOpt = allOptImages.find(
      (optImage: any) => optImage.key === selected.username
    );

    if (getSelectedOpt && getSelectedOpt.optImages !== undefined) {
      console.log("getSelectedOpt", getSelectedOpt.optImages);
      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = getSelectedOpt.optImages[0];
        return newOptImages;
      });
    }
  }, [allOptImages, selected]);

  useEffect(() => {
    socket.on(`friendRequestAccepted`, (Friend: any) => {
      const newValue = { src: Remove, alt: "Remove from friend list" };
      console.log(`the new value is: `, newValue);
      Cookies.set(Friend.username, JSON.stringify([newValue, optImages[1]]), {
        expires: 365,
      });

      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = newValue;
        return newOptImages;
      });
    });

    socket.on(`friendRequestRejected`, (Friend: any) => {
      const newValue = { src: AddToFriendList, alt: "Add to friend list" };
      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = newValue;
        return newOptImages;
      });

      Cookies.set(Friend.username, JSON.stringify([newValue, optImages[1]]), {
        expires: 365,
      });
    });




    socket?.on(`friendRemoved`, (Friend: any) => {
      console.log(Friend.username);

      const newValue = { src: AddToFriendList, alt: "Add to friend list" };

      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = newValue;
        return newOptImages;
      });

      Cookies.set(Friend.username, JSON.stringify([newValue, optImages[1]]), {
        expires: 365,
      });
    });

    return () => {
      socket.off(`friendRequestRejected`);
      socket.off(`friendRequestAccepted`);
      socket.off(`friendRemoved`);
    };
  }, [socket]);

  useEffect(() => {
    const cookies = Cookies.get(selected.username);
    console.log(`cookies`, selected.username);
    if (cookies) {
      setOptImages(JSON.parse(cookies));
    } else {
      setOptImages([
        { src: AddToFriendList, alt: "Add to friend list" },
      ]);
    }
  }, [selected]);

  const handleUserControls = (option: string) => {
    if (option === "Add to friend list") {
      socket.emit(`sendFreindRequest`, { friendId: userId });
      const newValue = { src: pending, alt: "Pending" };

      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = newValue;
        return newOptImages;
      });

      Cookies.set(selected.username, JSON.stringify([newValue, optImages[1]]), {
        expires: 365,
      });
    } else if (option === "Remove from friend list") {
      socket.emit(`removeFriend`, { friendId: userId });
      const newValue = { src: AddToFriendList, alt: "Add to friend list" };
      setOptImages((prevOptImages) => {
        const newOptImages = [...prevOptImages];
        newOptImages[0] = newValue;
        return newOptImages;
      });
      Cookies.set(selected.username, JSON.stringify([newValue, optImages[1]]), {
        expires: 365,
      });
    }
  };

  return optImages.map((image: any) => (
    <Box
      className="flex items-center gap-6 w-[220px]"
      key={image.alt}
      onClick={() => handleUserControls(image.alt)}
    >
      <Image
        src={image.src}
        priority={false}
        width={30}
        height={30}
        alt={image.alt}
        style={{
          width: "30px",
          height: "30px",
        }}
      />
      <Text className="text-2xl cursor-pointer">{image.alt}</Text>
    </Box>
  ));
}
