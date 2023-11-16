"use client";
import React, { useState, useEffect } from "react";
import {  Box, useMediaQuery } from "@chakra-ui/react";
import RightSidebar from "@/components/elements/ChatPage/rightSideBar/RightSidebar";
import RightSidebarChannel from "@/components/elements/ChatPage/rightSideBar/RightSideBarChannel";
import { Channel, User } from "@/utils/types/chat/ChatTypes";
import { setLeft, setMidle, setRight } from "@/redux/slices/chat/MobileSlice";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "@/components/elements/ChatPage/ChatWindow";
import RestrictedRoute from "@/components/RestrictedRoute";




export default function ChatPage() {



  const { RightClice } = useSelector((state: any) => state.mobile);


  const isDesktop = useMediaQuery("(min-width: 1000px)")
  const dispatch = useDispatch()
  const selected: Channel | User | null = useSelector((state: any) => state.chat.selectedChannelorUser);




  // useEffect(() => {
    
  //   socket.on(`receivedFreindRequest`, (user: User) => {
  //     console.log(user)
  //   });

  //   return () => {
  //     socket.off(`receivedFreindRequest`)
  //   }
    
  // }, [socket])
  


  useEffect(() => {
    if(isDesktop[0]) {
      dispatch(setRight(true))
      dispatch(setMidle(true))
      dispatch(setLeft(true))
    }
  }, [isDesktop])

  
  
  const sidebar = {
    open: (height = 1000) => ({
      // width: "375px",
      clipPath: `circle(${height * 2 + 200}px at 90% 90%)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      width: 0,
      clipPath: `circle(0px at 90% 90%)`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <RestrictedRoute>
      <div className=" flex flex-grow ">
        <ChatWindow />

        {selected !== null && "username" in selected ? (
          <RightSidebar />
        ) : selected !== null && "type" in selected ? (
          <RightSidebarChannel />
        ) : (
          <Box
            className="RightSideBar w-[375px] absolute md:block backdrop-blur-xl md:static md:w-[465px] h-full overflow-y-auto border-l-[3px] border-l-black pb-28 right-0"
            as={motion.div}
            initial={false}
            animate={RightClice.RightValue ? "open" : "closed"}
            variants={sidebar}
          ></Box>
        )}
      </div>
    </RestrictedRoute>
  );
}
