import { Button, Card, Dialog } from '@radix-ui/themes';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useRef, useState } from 'react';

const AnswerCard = ({ answer }) => {
  const answerboxRef = useRef(null);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (answerboxRef.current) {
      const height = answerboxRef.current.offsetHeight;
      setIsMore(height > 200);
    }
  }, []);

  return (
    <Card className="text-sm">
      <Dialog.Root>
        <p className="mb-2 text-md font-bold">작성자 : {answer.writer}</p>

        <div>
          <p className="text-md font-bold mb-2">[답변]</p>
          <div className="max-h-[200px] overflow-hidden">
            <div ref={answerboxRef} data-color-mode="light">
              <MarkdownEditor.Markdown source={answer.content} />
            </div>
          </div>
          {isMore && (
            <Dialog.Trigger className="cursor-pointer">
              <p className="text-gray-500 text-right">...더보기</p>
            </Dialog.Trigger>
          )}
        </div>
        <Dialog.Content className="overflow-hidden">
          <Dialog.Title>[답변]</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            작성자 : {answer.writer}
          </Dialog.Description>

          <div data-color-mode="light">
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
    </Card>
  );
};

export default AnswerCard;
