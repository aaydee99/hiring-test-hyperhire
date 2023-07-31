import { FC } from 'react'
import { BookInterface } from '../../interfaces'
import placeHolder from '../../assets/placeholder.png'
interface BookCardProps {
    book?: BookInterface
}

const BookCard: FC<BookCardProps> = ({book}) => {
  return <div className='w-fit'> 
    <img src={book?.image ? book.image : placeHolder} alt=''/>
    <div className='text-sm leading-[14px] tracking-[-1%] mt-4 text-[#1D232B]'>{book?.title ? book.title : '레이블라우스'}</div>
    <div className='flex justify-between mt-4 font-bold'>
        <div className='text-[#FF003E] '>{book?.discountPercentage ? book.discountPercentage : 10} %</div>
        <div className='text-[#080A0C]'>{book?.price ? book.price : 56500} 원</div>
    </div>
  </div>
}

export default BookCard