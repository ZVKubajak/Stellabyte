import { ISection } from '../interfaces/section';

const Section = ({ text }: ISection) => {
    return (
        <div className="mx-4 p-1 rounded bg-[#13547a] ">
            <p className='text-center text- text-[whitesmoke] p-0 m-2'>{text}</p>
        </div>
    )
};

export default Section;