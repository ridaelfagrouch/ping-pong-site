import React, { useState } from 'react'
import { Avatar, AvatarBadge, Box, Icon, Modal, useDisclosure } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import Search from '../leftsidebar/search'
import Hashtag from '../leftsidebar/hatshtag'
import Newchannel from '../leftsidebar/newchannel'
import Newmessage from '../leftsidebar/newmessage'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Channel, User } from '@/utils/types/chat/ChatTypes';
import { useSelector, useDispatch } from 'react-redux'



function Usercard(props: any) {


  return (<div className='flex justify-between items-center  cursor-pointer m-2 ml-0 p-2  rounded-md'>

    <div> 
      <Avatar className='custom-shadow border-[1px] border-black' boxSize={14}>
        <AvatarBadge className='custom-shadow border-[1px] border-black' boxSize={4} bg='green.500' />
      </Avatar>

    </div>

    <div className='ml-[7px] flex flex-col  text-left w-[60%] justify-around'>
      <div className='text-[22px] font-bold'>{props.data.userName}</div>
      <div className='text-gray-400 text-[12px] font-medium	'>ok, see you tomorrow</div>
    </div>

    <div className='flex flex-col items-center text-center '>
      <div className='text-[13px] text-gray-400'>06:49 pm</div>
      <div className='rounded-full bg-black w-5 h-5 flex items-center justify-center text-[20px] text-white'>3</div>
    </div>

  </div>)
}

export default function MobileLeftBar({ LeftIsOpen, setLeftIsOpen }: any) {
  

  const { MidleClice } = useSelector((state: any) => state.mobile)
  const { LeftClice } = useSelector((state: any) => state.mobile)
  const { RightClice } = useSelector((state: any) => state.mobile)
  console.log(LeftClice)
    const ref = React.useRef(null)
    const inView = useInView(ref)

    let [channels, setNewChannels]: any = useState([])

    let [users, setNewUsers]: any = useState([])
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ChannelOrUser, setChannelOrUser] = useState(false)


  const sidebar = {
     
        open: (height = 1000) => ({
          width: "300px",
          clipPath: `circle(${height * 2 + 200}px at 90% 90%)`,
          transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
          }
        }),
        closed: {
          width: 0,
          clipPath: `circle(30px at 10% 90%)`,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 40
          }
        }
      };


  return (
    <Box ref={ref} className='h-screen overflow-y-scroll border-r-[3px] border-r-black  items-center  gap-10 pt-6 z-0 md:hidden'
    as={motion.div}
    initial={false}
      animate={LeftClice.LeftValue ? "open" : "closed"}
    variants={sidebar}
    >
      
      <Search
          channels={channels}
          users={users}
        />

        <div className='  w-[80%] flex justify-between items-center border-b-black border-b-2 mt-[20px]'>
          <div className='text-[30px] font-bold w-full'>Channels</div>
          <div onClick={() => { onOpen(), setChannelOrUser(true) }} className='cursor-pointer' ><Icon boxSize={10} as={SmallAddIcon} /></div>
        </div>

        <div className='flex w-[80%]  h-[200px] flex-col mt-[30px]  gap-6 overflow-y-scroll'>

          {channels.map((data: Channel) => {
            if (data.name)
              return <Hashtag data={data} />
          })}

        </div>

        <div className='w-[80%] flex justify-between items-center border-b-black border-b-2 mt-[20px]'>
          <div className='text-[28px] font-bold w-full'>Direct Messages</div>
          <div onClick={() => { onOpen(), setChannelOrUser(false) }} className='cursor-pointer'><Icon boxSize={10} as={SmallAddIcon} /></div>
        </div>

        {/* <div className=' mt-[50px] flex  h-[300px] flex-col gap-6 overflow-y-scroll'> */}

          {users.map((data: User) => {
            return <Usercard 
            key={data.username}
            data={data} />
          })}

        {/* </div> */}




      {ChannelOrUser === true ? <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <Newchannel isOpen={isOpen}
          onClose={onClose}
          setNewChannels={setNewChannels}
          channels={channels}

        />
      </Modal> : <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <Newmessage isOpen={isOpen}
          onClose={onClose}
          setNewUsers={setNewUsers}
          users={users}
        />
      </Modal>}


    </Box>
  )
}
