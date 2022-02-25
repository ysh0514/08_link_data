## 팀원
[양성호 , 김영길 ]

## 배포 주소

## <a href="https://whispering-journey-42055.herokuapp.com/">배포 사이트</a>

## 💻 설치 방법

    npm install
    npm start

## 📂 파일 구조

src    
 ┣ components      
 ┃ ┣ Avatar.tsx     
 ┃ ┣ Button.tsx      
 ┃ ┗ Container.tsx     
 ┣ constants      
 ┃ ┗ constants.ts      
 ┣ pages      
 ┃ ┣ DetailPage      
 ┃ ┃ ┗ index.tsx           
 ┃ ┗ LinkPage     
 ┃ ┃ ┗ index.tsx      
 ┣ styles           
 ┃ ┣ GlobalStyle.tsx      
 ┃ ┗ colors.ts     
 ┣ utils     
 ┃ ┗ utils.ts      
 ┣ App.tsx      
 ┣ index.tsx       
 ┣ react-app-env.d.ts     
 ┣ reportWebVitals.ts            
 ┗ setupTests.ts    

## 📋개발 진행 상황 공유

<img width="400" alt="스크린샷 2022-02-12 오후 4 03 47" src="https://user-images.githubusercontent.com/80146176/153703072-7779ad79-3620-4a81-b4e4-dacb6da59c4e.png">


### 프로젝트 과정 소개

| 슬랙을 이용한 소통                                                                                                             |                                                       게더를 활용한 소통                                                       |
| :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------: |
| <img width="auto" src="https://user-images.githubusercontent.com/80146176/153052997-f2ca6637-40f8-4e7f-9609-f4885577706a.png"> | <img width="auto" src="https://user-images.githubusercontent.com/80146176/153053947-7be40938-62f8-4dd9-a54b-7328ea550546.png"> |
| 노션에서의 소통                                                                                                                |                                                     화면공유를 활용한 소통                                                     |
| <img width="auto" src="https://user-images.githubusercontent.com/80146176/153054588-6194940a-a76d-4fde-a164-2efb3989d6e8.png"> | <img width="auto" src="https://user-images.githubusercontent.com/80146176/153054110-d7c4169e-3824-4903-8ca5-fc4aec044055.png"> |



## 📝 기능


- axios 를 통해 제공된 api 에서 데이터를 받아와 화면에 표시 했습니다.
- 링크페이지에서 디테일 페이지로 넘어가는 거 기술해주세요 @ 영길님
- new Date() 메서드를 사용하여 현재 시간과 api에서 받아온 데이터의 시간을 비교하여 유효기간 만료 여부를 알아냅니다.
- 유효기간 만료 여부에 따라 화면의 구성이 바뀔 수 있도록 조건문을 통해 구현 했습니다.
- 날짜, 파일 크기 와 같은 데이터는 인스턴스 메서드 등 다양한 메서드를 활용하여 화면과 같이 텍스트가 출력 될 수 있도록 구현 했습니다.
- 유효기간 실시간 갱신 적어주세요 @ 영길님
- url 링크를 navigator.clipboard.writeText() 메서드를 활용하여 클립보드에 저장 할 수 있도록 구현 했습니다.



