import { Grid } from '@radix-ui/themes';
import { Content } from '@radix-ui/react-accordion';
import AnswerCard from './AnswerCard';
import AddAnswerCard from './AddAnswerCard';

const QuizAnswers = ({ answers, quizId }) => {
  return (
    <Content>
      <Grid columns="3" gap="3" width="auto" className="p-5">
        {answers.map((answer, i) => (
          <AnswerCard key={i} answer={answer} />
        ))}
        <AddAnswerCard quizId={quizId} />
      </Grid>
    </Content>
  );
};

export default QuizAnswers;
