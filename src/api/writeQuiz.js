import { ref, get, set } from 'firebase/database';
import { database } from './firebaseApp';

const writeQuiz = async ({ title }) => {
  const dbRef = ref(database, 'data/quiz');
  const snapshot = await get(dbRef);
  const origins = snapshot.val();
  const newId = Math.floor(Math.random() * 100000);
  const newQuiz = {
    id: newId,
    title: title,
  };
  const updated = [...origins, newQuiz];
  try {
    await set(dbRef, updated);
    return true;
  } catch (error) {
    alert('등록에 실패 했습니다.', error);
    return false;
    // throw new Error(error instanceof Error ? error.message : '업데이트 실패');
  }
};

export default writeQuiz;
