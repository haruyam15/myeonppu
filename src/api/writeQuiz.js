import { ref, get, set } from 'firebase/database';
import { database } from './firebaseApp';

const writeQuiz = async ({ title }) => {
  const dbRef = ref(database, 'data/quiz');
  const snapshot = await get(dbRef);
  const origins = snapshot.val();
  const newId = origins[origins.length - 1].id + 1;
  const newQuiz = {
    id: newId,
    title: title,
  };
  const updated = [...origins, newQuiz];
  console.log('Updated data to save:', updated);
  try {
    await set(dbRef, updated);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '업데이트 실패');
  }
};

export default writeQuiz;
