import {
  Root as AccordionRoot,
  Item as AccordionItem,
} from '@radix-ui/react-accordion';
import QuizTitle from './components/QuizTitle';
import QuizAnswers from './components/QuizAnswers';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './api/firebaseApp';
import AddQuiz from './components/AddQuiz';

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, 'data/quiz');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        const sortedData = [...data].reverse();
        setDatas(sortedData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!datas || datas.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wrap">
      <AccordionRoot defaultValue="q-0" type="single" collapsible>
        <div className="w-[80%] m-auto divide-y border rounded-lg">
          {datas.map((data, i) => {
            const title = data.title;
            const answers = data.answer || [];
            const quizId = data.id;
            return (
              <AccordionItem value={`q-${i}`} className="group" key={i}>
                <QuizTitle title={title} />
                <QuizAnswers answers={answers} quizId={quizId} />
              </AccordionItem>
            );
          })}
        </div>
      </AccordionRoot>

      <AddQuiz />
    </div>
  );
}

export default App;
