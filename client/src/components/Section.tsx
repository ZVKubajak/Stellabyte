import { ISection } from '../interfaces/section';

const Section = ({ text }: ISection) => {
    return (
        <div className="relative mx-4 p-1 rounded testing xl:h-[200px] xl:w-[325px] xl:flex xl:items-center 2xl:w-[400px]">
            {/* Background div */}
            <div className="absolute inset-0 glass shadow-none z-0"></div>
            <p className='text-center text-[whitesmoke] p-0 m-2 z-10 relative sm:text-xl'>{text}</p>
        </div>
    )
};

export default Section;
