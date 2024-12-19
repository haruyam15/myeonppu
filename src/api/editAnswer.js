import { ref, get, set } from 'firebase/database';
import { database } from './firebaseApp';

const editAnswer = async ({ quizId, updatedData }) => {
  const dbRef = ref(database, 'data/quiz');
  const snapshot = await get(dbRef);
  const origins = snapshot.val();
  const updated = origins.map((origin) => {
    if (quizId === origin.id) {
      const targetAnswerId = updatedData.id;
      return {
        ...origin,
        answer: origin.answer.map((aw) => {
          if (targetAnswerId === aw.id) {
            return updatedData;
          } else {
            return aw;
          }
        }),
      };
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

export default editAnswer;
