import { CirclePlus, X } from 'lucide-react';
import { Button, Dialog, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import writeQuiz from '../api/writeQuiz';

const AddQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => {
    if (quizTitle.length === 0) {
      alert('질문을 입력해주세요.');
      return;
    }
    writeQuiz({ title: quizTitle });
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <div
        className="fixed bottom-10 right-10 cursor-pointer group flex items-center gap-0 hover:gap-3 bg-indigo7 rounded-lg p-3  text-indigo12"
        onClick={() => setIsOpen(true)}
      >
        <CirclePlus />
        <p className="w-0 overflow-hidden whitespace-nowrap group-hover:w-[90px] transition-all duration-300 ease-in-out font-bold">
          퀴즈 추가하기
        </p>
      </div>

      <Dialog.Content>
        <div className="relative">
          <Dialog.Title>퀴즈 추가하기</Dialog.Title>
          <Dialog.Description></Dialog.Description>

          <div className="min-h-[100px] flex items-center">
            <TextField.Root
              placeholder="질문을 입력해주세요"
              className="w-full h-[40px]"
              onChange={(e) => setQuizTitle(e.target.value)}
              asChilds
            />
          </div>

          <div className="flex justify-end mt-3">
            <Button
              variant="soft"
              color="indigo"
              size="3"
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>

          <X
            size="30"
            className="absolute top-[-8px] right-[-8px] cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddQuiz;
