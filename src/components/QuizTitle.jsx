import { Trigger, Header } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const QuizTitle = ({ title }) => {
  return (
    <Header>
      <Trigger className="w-full relative group-data-[state=open]:border-b hover:bg-violet-50 group-data-[state=open]:bg-violet-50">
        <p className="text-left w-[95%] min-h-[70px] flex items-center pl-5 font-bold group-data-[state=open]:text-violet11">
          Q. {title}
        </p>
        <ChevronDown
          className="transform transition-transform duration-300 group-data-[state=open]:rotate-180 absolute top-[50%] mt-[-15px] right-2 group-data-[state=open]:text-violet11"
          aria-hidden
        />
      </Trigger>
    </Header>
  );
};

export default QuizTitle;
