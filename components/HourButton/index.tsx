import { Button } from "@chakra-ui/react"

interface IHourButton{
  hour: string;
}

export const HourButton = ({ hour }: IHourButton) => {
  return(
    <Button p={8} colorScheme="blue">
      {hour}
    </Button>
  )
}