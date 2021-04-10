import Image from "next/image";

interface ILogo{
  width?: string;
  height?: string;
}

export const Logo = ({ width, height }: ILogo) => {
  return (
    <Image
      src="/logo-clocker.svg" 
      alt="Logo"
      width={width || "280"}      
      height={height || "90"}      
    />  
  )
}
