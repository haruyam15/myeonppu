import { ref, get, set } from 'firebase/database';
import { database } from './firebaseApp';

const writeAnswer = async ({ quizId, newData }) => {
  const dbRef = ref(database, 'data/quiz');
  const snapshot = await get(dbRef);
  const origins = snapshot.val();
  const updated = origins.map((origin) => {
    const newAnswer = origin.answer ? [...origin.answer, newData] : [newData];
    if (origin.id === quizId) {
      return { ...origin, answer: newAnswer };
    } else {
      return origin;
    }
  });
  try {
    await set(dbRef, updated);
    return true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '업데이트 실패');
  }
};

export default writeAnswer;
