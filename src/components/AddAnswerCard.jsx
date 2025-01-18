import { Button, Card, TextField, Dialog } from '@radix-ui/themes';
import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import writeAnswer from '../api/writeAnswer';
import MarkdownEditor from '@uiw/react-markdown-editor';
import checkPassword from '../utils/checkPassword';

const AddAnswerCard = ({ quizId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const writerRef = useRef('');

  const markDownClear = () => {
    setMarkdown('');
  };

  const postAnswer = async ({ quizId, newData }) => {
    const result = await writeAnswer({ quizId, newData });

    try {
      if (result) {
        setIsOpen(false);
        markDownClear();
      }
    } catch (error) {
      alert('등록에 실패 했습니다.', error);
    }
  };

  const handleSubmit = () => {
    const writer = writerRef.current.value;

    if (writer.length === 0 || markdown.length === 0) {
      alert('이름, 내용을 입력해주세요.');
      return;
    }

    if (!checkPassword()) {
      return;
    }

    const newData = {
      content: markdown,
      writer,
    };

    //끝나면 닫기
    postAnswer({ quizId, newData });
  };

  return (
    <Card className="hover:bg-mauve3">
      <Dialog.Root open={isOpen}>
        <div
          className="flex items-center justify-center text-gray-500 size-full hover:text-gray-800"
          onClick={() => setIsOpen(true)}
        >
          <Plus size="50" />
        </div>
        <Dialog.Content maxWidth="1000px">
          <div className="relative">
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

              <div
                className="min-h-[300px] prose max-w-full"
                data-color-mode="light"
              >
                <MarkdownEditor
                  value={markdown}
                  width="100%"
                  height="300px"
                  onChange={(value) => setMarkdown(value)}
                />
              </div>
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
                markDownClear();
              }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </Card>
  );
};

export default AddAnswerCard;
