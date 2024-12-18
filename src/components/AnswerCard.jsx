import { Button, Card, Dialog, IconButton } from '@radix-ui/themes';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import deleteAnswer from '../api/deleteAnswer';

const AnswerCard = ({ answer }) => {
  const answerboxRef = useRef(null);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (answerboxRef.current) {
      const height = answerboxRef.current.offsetHeight;
      setIsMore(height > 200);
    }
  }, []);

  const handelDelete = () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    if (isConfirmed) {
      deleteAnswer(answer.id);
    } else {
      return;
    }
  };

  return (
    <Card className="text-sm">
      <Dialog.Root>
        <p className="mb-2 text-md font-bold">작성자 : {answer.writer}</p>

        <div>
          <p className="text-md font-bold mb-2">[답변]</p>
          <div className="max-h-[200px] overflow-hidden">
            <div ref={answerboxRef} data-color-mode="light" className="prose">
              <MarkdownEditor.Markdown source={answer.content} />
            </div>
          </div>
          {isMore && (
            <Dialog.Trigger className="cursor-pointer">
              <p className="text-gray-500 text-right">...더보기</p>
            </Dialog.Trigger>
          )}
        </div>
        <Dialog.Content className="overflow-hidden" maxWidth="800px">
          <Dialog.Title>[답변]</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            작성자 : {answer.writer}
          </Dialog.Description>

          <div data-color-mode="light" className="prose">
            <MarkdownEditor.Markdown source={answer.content} />
          </div>
          <div className="flex justify-end mt-3 gap-3">
            <Button
              variant="soft"
              color="orange"
              size="3"
              onClick={() => alert('아직 안됩니다,,')}
            >
              수정
            </Button>

            <Dialog.Close asChild>
              <Button variant="soft" color="gray" size="3">
                닫기
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <IconButton
        size="1"
        variant="soft"
        color="crimson"
        className="absolute top-2 right-2"
        onClick={handelDelete}
      >
        <Trash2 size="15" />
      </IconButton>
    </Card>
  );
};

export default AnswerCard;
