import { useState } from 'react'

import { Button, useDisclosure } from "@chakra-ui/react"

import { HourModal } from '../'

interface IHourButton{
  hour: string;
}

export const HourButton = ({ hour }: IHourButton) => {  
  const [isOpen, setIsOpen] = useState(false)

  const handleModal = () => setIsOpen(prevState => !prevState)

  return(
    <>
      <Button p={8} colorScheme="blue" onClick={handleModal}>
        {hour}
      </Button>
      <HourModal hour={hour} isOpen={isOpen} onClose={handleModal}/>
    </>
  )
}