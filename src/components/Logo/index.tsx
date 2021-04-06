import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo-clocker.svg" 
      alt="Logo"
      width={290}
      height={80}
    />  
  )
}
