import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo-clocker.svg" 
      alt="Logo"
      width={290}
      height={80}
    />  
  )
}
