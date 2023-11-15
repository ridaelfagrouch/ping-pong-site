'use client';

import { Flex, Box, Avatar, Container, Icon } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'

import ChartPie from '@/components/userPage/ChartPie';
import Collection from '@/components/userPage/Coalitions';
import ChartLine from '@/components/userPage/ChartLine';
import FriendList from '@/components/userPage/FriendList';
import Achievements from '@/components/userPage/Achievements'
import MatchHistory from '@/components/userPage/MatchHistory';



export default function Profile({params}: any) {
  return (
    <div className="w-full h-full py-40 px-8 container m-auto">
        <Flex className='flex-wrap lg:flex-nowrap lg:space-x-8'>
            {/* Profile */}
            <Box className='mb-8 p-0 mr-0 border-solid border-2 border-gray-900 custom-shadow rounded w-full lg:w-1/3' p={4} color="black">
                <Flex className='justify-between'>
                    <h2 className=' bg-black text-white p-1 text-xl rounded-br-lg'>
                        <span className='inline-block w-5 h-5 rounded-full border mr-4 bg-green-500'></span>
                        Available
                    </h2>
                    <button className='bg-black text-white px-4 rounded-bl-lg hover:bg-gray-700'>
                        <Icon as={MdSettings} /> Edit
                    </button>
                </Flex>

                <Flex className='w-full h-[calc(100%-36px)] items-center'>
                    <Flex className='justify-around items-center w-full h-full py-6'>
                        <div className='flex flex-col justify-center font-bold text-3xl'>
                            <h3>Hssain Aitkadir</h3>
                            <h3 className='text-gray-400'>@haitkadir</h3>
                        </div>
                        <Avatar className='border-solid border-2 border-gray-900 custom-shadow' size="xl" name="Segun Adebayo" src="https://pbs.twimg.com/profile_images/1694707441437704193/lxUVfB4X_400x400.jpg" />
                    </Flex>
                </Flex>
            </Box>
            {/* Stats */}
            <Box className='flex-grow mb-8 p-0 mr-0 border-solid border-2 border-gray-900 custom-shadow rounded' p={4} color="black">
                <Flex className='flex-wrap md:flex-nowrap'>
                    <div className='bg-gray-200 border-r-2 border-black w-[100%] md:basis-1/12'>
                        <h4 className='font-bold text-center bg-black text-white text-xl border-r border-white md:h-[15%]'>Team</h4>
                         <div className='md:h-[85%]'>
                            <Collection type={'pandora'} />
                         </div>
                    </div>
                    <div className=' border-r-2 border-black w-[100%] md:basis-7/12'>
                        <h4 className='font-bold text-center bg-black text-white text-xl border-r border-white'>Activity</h4>
                        <div>
                            <ChartLine userId={params.id}/>
                        </div>
                    </div>
                    <div className=' w-[100%] md:basis-1/3'>
                        <h4 className='font-bold text-center bg-black text-white text-xl border-l border-white'>Stats</h4>
                        <div>
                            <ChartPie userId={params.id}/>
                        </div>
                    </div>
                </Flex>
            </Box>
        </Flex>


        <div className='h-[540px]  lg:grid grid-rows-2 grid-cols-2 grid-flow-col gap-8'>
            <div className='lg:col-span-1 lg:row-span-2 h-full w-full mb-8 lg:mb-0 border-black border-2 rounded custom-shadow'>
                <FriendList />
            </div>

            <div className='lg:col-span-1  min-h-[250px] lg:h-full w-full  mb-8 lg:mb-0 border-black border-2 rounded custom-shadow'>
                <Achievements userId={params.id} />
            </div>
            <div className='lg:col-span-1 min-h-[250px] lg:h-full w-full  mb-8 lg:mb-0 border-black border-2 rounded custom-shadow'>
                <MatchHistory userId={params.id} />
            </div>
 
        </div>


    </div>
  )
}