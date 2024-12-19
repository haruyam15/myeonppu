import { ref, get, set } from 'firebase/database';
import { database } from './firebaseApp';

const deleteAnswer = async (quizId, targetAnswerId) => {
  const dbRef = ref(database, 'data/quiz');
  const snapshot = await get(dbRef);
  const origins = snapshot.val();

  const updated = origins.map((quiz) => {
    if (quiz.id === quizId) {
      return {
        ...quiz,
        answer: quiz.answer.filter((ans) => ans.id !== targetAnswerId),
      };
    } else {
      return quiz;
    }
  });

  try {
    await set(dbRef, updated);
    return true;
  } catch (error) {
    alert('삭제 실패 했습니다.', error);
    return false;
  }
};

export default deleteAnswer;
