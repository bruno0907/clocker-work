import { Button, useDisclosure } from "@chakra-ui/react"

import { HourModal } from '../'

interface IHourButton{
  hour: string;
}

export const HourButton = ({ hour }: IHourButton) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Button p={8} colorScheme="blue" onClick={onOpen}>
      {hour}

      <HourModal isOpen={isOpen} onClose={onClose} hour={hour}/>
    </Button>
  )
}