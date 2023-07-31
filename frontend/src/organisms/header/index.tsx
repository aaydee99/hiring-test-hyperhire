import { FC } from 'react'

interface HeaderProps {
    title?:string
}

const Header: FC<HeaderProps> = ({title}) => {
  return <header className='text-xl font-bold flex justify-center mb-5'>
    <p>{title ? title : "Books"}</p>
  </header>
}

export default Header