import { CirclePlus, X } from 'lucide-react';
import { Button, Dialog, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import writeQuiz from '../api/writeQuiz';
import checkPassword from '../utils/checkPassword';

const AddQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const postQuiz = async (title) => {
    const result = await writeQuiz({ title });

    try {
      if (result) {
        setIsOpen(false);
        setQuizTitle('');
      }
    } catch (error) {
      alert('등록에 실패 했습니다.', error);
    }
  };

  const handleSubmit = () => {
    if (quizTitle.length === 0) {
      alert('퀴즈를 입력해주세요.');
      return;
    }
    if (!checkPassword()) {
      return;
    }
    postQuiz(quizTitle);
  };

  return (
    <Dialog.Root open={isOpen}>
      <div
        className="fixed flex items-center gap-0 p-3 rounded-lg cursor-pointer bottom-10 right-10 group hover:gap-3 bg-indigo7 text-indigo12"
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
              asChild
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
            onClick={() => {
              setIsOpen(false);
              setQuizTitle('');
            }}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddQuiz;
