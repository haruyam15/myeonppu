import { Button, Card, Dialog, IconButton, TextField } from '@radix-ui/themes';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import deleteAnswer from '../api/deleteAnswer';
import editAnswer from '../api/editAnswer';

const AnswerCard = ({ answer, quizId }) => {
  const answerboxRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [markdown, setMarkdown] = useState(answer.content);
  const [writer, setWriter] = useState(answer.writer);

  useEffect(() => {
    if (answerboxRef.current) {
      const height = answerboxRef.current.offsetHeight;
      setIsMore(height > 200);
    }
  }, []);

  const handelDelete = () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    if (isConfirmed) {
      deleteAnswer(quizId, answer.id);
    } else {
      return;
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsOpen(true);
  };

  const postAnswer = async ({ quizId, updatedData }) => {
    const result = await editAnswer({ quizId, updatedData });

    try {
      if (result) {
        setIsOpen(false);
        setIsEditMode(false);
      }
    } catch (error) {
      alert('등록에 실패 했습니다.', error);
    }
  };

  const handleSubmit = () => {
    if (writer.length === 0 || markdown.length === 0) {
      alert('이름, 내용을 입력해주세요.');
      return;
    }

    const updatedData = {
      content: markdown,
      writer,
      id: answer.id,
    };

    postAnswer({ quizId, updatedData });
  };

  return (
    <Card className="text-sm">
      <Dialog.Root open={isOpen}>
        <p className="mb-2 text-md font-bold">작성자 : {answer.writer}</p>

        <div>
          <p className="text-md font-bold mb-2">[답변]</p>
          <div className="max-h-[200px] overflow-hidden">
            <div ref={answerboxRef} data-color-mode="light" className="prose">
              <MarkdownEditor.Markdown source={answer.content} />
            </div>
          </div>
          {isMore && (
            <p
              className="text-gray-500 text-right cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              ...더보기
            </p>
          )}
        </div>
        {isEditMode ? (
          <Dialog.Content className="overflow-hidden" maxWidth="800px">
            <Dialog.Title>[답변]</Dialog.Title>
            <Dialog.Description />
            <TextField.Root
              placeholder="이름"
              radius="large"
              size="2"
              className="max-w-[200px] mb-3"
              defaultValue={writer}
              onChange={(e) => setWriter(e.target.value)}
            />

            <div
              data-color-mode="light"
              className="min-h-[300px] prose max-w-full"
            >
              <MarkdownEditor
                value={markdown}
                width="100%"
                height="300px"
                onChange={(value) => setMarkdown(value)}
              />
            </div>
            <div className="flex justify-end mt-3 gap-3">
              <Button
                variant="soft"
                color="gray"
                size="3"
                onClick={() => {
                  setIsOpen(false);
                  setIsEditMode(false);
                  setMarkdown(answer.content);
                  setWriter(answer.writer);
                }}
              >
                닫기
              </Button>
              <Button
                variant="soft"
                color="indigo"
                size="3"
                onClick={handleSubmit}
              >
                완료
              </Button>
            </div>
          </Dialog.Content>
        ) : (
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
                color="gray"
                size="3"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </Button>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Root>
      <IconButton
        size="1"
        variant="soft"
        color="orange"
        className="absolute top-2 right-10"
        onClick={handleEdit}
      >
        <Pencil size="15" />
      </IconButton>
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
