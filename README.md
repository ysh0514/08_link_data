## 팀원

[양성호 , 김영길 ]

## 배포 주소

## <a href="https://dry-hollows-03672.herokuapp.com/">배포 사이트</a>

## 💻 설치 방법

    npm install
    npm start:dev

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

### Axios를 통해 데이터를 가져왔습니다.
- axios를 통해 제공된 api가 아닌 json-server를 이용해서 유효기간 날짜만 변경된 데이터를 받아와 화면에 표시했습니다. 그 이유는 api의 날짜 데이터가 22년 1월로 나와있어서 좀 더 다양하게 기능을 테스트해 볼 수 있는 최신 날짜로 갱신하였습니다.

### 중복하여 데이터를 가져오는 것을 지양했습니다.

- react-router-dom의 useMatch, useLocation을 이용해서 처음에 fetch 받은 데이터를 상세 페이지로 넘겼습니다.

### 유효기간 만료 여부를 데이터마다 알아냈습니다.

- new Date() 메서드를 사용하여 현재 시간과 api에서 받아온 데이터의 시간을 비교하여 유효기간 만료 여부를 알아냅니다.

### 유효 기간에 따라 화면 구성을 달리했습니다.

- 유효기간 만료 여부에 따라 화면의 구성이 바뀔 수 있도록 조건문을 통해 구현했습니다.

### 다양한 메서드를 활용하여 구현하였습니다.

- 날짜, 파일 크기 와 같은 데이터는 인스턴스 메서드 등 다양한 메서드를 활용하여 화면과 같이 텍스트가 출력 될 수 있도록 구현했습니다.

### 유효기간을 실시간으로 반영되게 구현하였습니다.

- 유효기간을 setTimeout을 통해 (60초 - 현재 시간의 초)의 계산을 하여 (60초 - 현재 시간의 초) 후에 리렌더를 하고 setInterval 을 통해 15초마다 리렌더되도록 하였습니다.

### URL을 클릭한 경우 클립보드 복사 기능을 구현하였습니다.

- url 링크를 navigator.clipboard.writeText() 메서드를 활용하여 클립보드에 저장할 수 있도록 구현했습니다.

### 파일의 섬네일 이미지를 표현했습니다.
- api 데이터 값 중 svg 파일이 아니라면 섬네일 이미지를 보여주고 그게 아니라면 default 이미지를 보여주도록 하였습니다. svg 파일이라면 파일이 제대로 나오지 않는 이슈가 있었기 때문입니다
