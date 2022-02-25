export const copyUrl = (text: string) => {
  if (text === '만료됨') return;

  navigator.clipboard.writeText(text).then(
    function () {
      alert(text + ' 주소가 복사 되었습니다.');
    },
    function () {
      console.log('error');
    }
  );
};
