const checkPassword = () => {
  const result = prompt('암호를 입력하세요.');
  if (result === import.meta.env.VITE_PASSWORD) {
    return true;
  } else {
    alert('암호가 틀렸습니다.');
    return false;
  }
};

export default checkPassword;
