import { Button, Card, TextArea, TextField, Dialog } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import writeQuiz from '../api/writeAnswer';

const AddAnswerCard = ({ quizId }) => {
  const writerRef = useRef('');
  const textRef = useRef('');

  const handleSubmit = () => {
    const writer = writerRef.current.value;
    const content = textRef.current.value;

    if (writer.length === 0 || content.length === 0) {
      alert('이름, 내용을 입력해주세요.');
      return;
    }

    const newData = {
      content,
      writer,
    };
    writeQuiz({ quizId, newData });
  };

  return (
    <Card className="hover:bg-mauve3">
      <Dialog.Root>
        <Dialog.Trigger className="cursor-pointer">
          <div className="size-full flex items-center justify-center text-gray-500 hover:text-gray-800">
            <Plus size="50" />
          </div>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>[답변]</Dialog.Title>
          <Dialog.Description />

          <div>
            <TextField.Root
              placeholder="이름"
              radius="large"
              size="2"
              className="max-w-[200px] mb-3"
              ref={writerRef}
            />

            <div className="min-h-[300px]">
              <TextArea
                size="2"
                placeholder="답변"
                radius="large"
                resize="vertical"
                className="textArea-answer"
                ref={textRef}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Dialog.Close>
              <Button
                variant="soft"
                color="indigo"
                size="3"
                onClick={handleSubmit}
              >
                완료
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </Card>
  );
};

export default AddAnswerCard;
