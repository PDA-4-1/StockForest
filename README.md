# StockForest

# 📅 프로젝트 개요

**개발 기간** : 2024.06.04 ~ 2024.06.27 (총 4주)

## Team Member

| <img src="https://avatars.githubusercontent.com/u/122499274?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/101380919?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/116863184?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/49721857?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/93638922?v=4" width="150" height="150"/> |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                     김현아<br/>[@hyuna333](https://github.com/hyuna333)                     |                 양진혁<br/>[@YangJinHyeok](https://github.com/YangJinHyeok)                 |                   임세현<br/>[@LimSeHyeon](https://github.com/LimSeHyeon)                   |                     최지연<br/>[@jiyeon5](https://github.com/jiyeon5)                      |                     하윤철<br/>[@Yoon-97](https://github.com/Yoon-97)                      |

# 💡서비스 소개

> 😎 _모여봐요 주식의 숲_ :
> 모여봐요 주식의 숲은 유아들을 위한 쉽고 재미있는 주식 입문 게임 서비스 입니다.
>
> 게임형식으로 주식투자에 대한 거부감을 줄이고 실제 투자 경험을 모방할 수 있는 기능을 제공합니다.
>
> 실제 데이터를 기반으로 한 주가와 뉴스를 통해 주가를 예측함으로써 의사결정능력과 사고력 향상이 가능합니다.
>
> 간단한 용어와 직관적인 인터페이스를 통해 학생들이 쉽게 접근 할 수 있습니다.

## ⚙️ 기술 스택

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=61DAFB)
![Javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![Tailwindcss](https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)  
![nodedotjs](https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![mysql](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)  
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![AMAZON EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900.svg?style=for-the-badge&logo=Amazon-EC2&logoColor=white)
![AMAZON S3](https://img.shields.io/badge/Amazon%20S3-569A31.svg?style=for-the-badge&logo=Amazon-S3&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009639.svg?&style=for-the-badge&logo=nginx&logoColor=white)  
![Figma](https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=Figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white)
![SLACK](https://img.shields.io/badge/Slack-4A154B.svg?style=for-the-badge&logo=Slack&logoColor=white)
![discord](https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![git](https://img.shields.io/badge/git-F05032.svg?style=for-the-badge&logo=git&logoColor=white)
​

## 📂시스템 아키텍처

​![아키텍처](https://github.com/PDA-4-1/StockForest/assets/122499274/642b7ef6-35e8-4726-8c3c-dd5fcff974fe)

## 🗂️ERD

![ERD](https://github.com/PDA-4-1/StockForest/assets/122499274/9a3bdd61-c71c-4755-8301-3169935e43c3)

# 컨벤션

## Commit Message

<details>
<summary>자세히보기</summary>
<div markdown="1">
| 이모지 | 유형     | 설명                                              | 예시                                                             |
| ------ | -------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| ✨     | feat     | 새로운 기능 추가                                  | ✨ feat: 버튼 컴포넌트 디자인 변경                               |
| 🐛     | fix      | 버그 수정                                         | 🐛 fix: 이메일 필드가 비어 있을 때 발생하는 오류 수정            |
| ⚡     | update   | Fix와 달리 원래 정상적으로 동작했지만 보완의 개념 | ⚡ update: 에러 팝업 기본 alert에서 UI Modal 컴포넌트로 수정     |
| ♻      | refactor | 코드 리팩터링 (기능 변경 없음)                    | ♻ refactor: 사용자 인증 로직을 서비스 레이어로 분리              |
| 🎨     | design   | CSS 등 사용자 UI 디자인 변경                      | 🎨 design: 메인 페이지에 CSS 그리드 레이아웃 적용                |
| 🛠️     | chore    | 빌드 업무 수정, 패키지 매니저 수정                | 🛠️ chore: React 버전을 16.8로 업데이트                           |
| 📚     | docs     | _.md, _.txt와 같은 문서 파일 수정                 | 📚 docs: README.md에 시스템 구성도 추가                          |
| 💬     | comment  | 주석 추가 및 변경                                 | 💬 comment: 복잡한 정렬 알고리즘 설명을 위한 주석 추가           |
| 💄     | style    | 코드 스타일 변경 (세미콜론 누락, 로직 변경 없음)  | 💄 style: 들여쓰기 적용, 빠진 중괄호를 추가하여 코드 가독성 향상 |
| 🗑️     | remove   | 파일 삭제                                         | 🗑️ remove: 더 이상 사용되지 않는 로컬 스토리지 헬퍼 함수 삭제    |
| 🚚     | rename   | 파일 혹은 폴더명 수정 또는 이동 작업만            | 🚚 rename: 컴포넌트 파일명을 더 명확하게 변경                    |
</div>
</details>

## Code Review

<details>
<summary>자세히 보기</summary>
<div markdown="1">

| 이모지 | 용어  | 설명                                                                                                                                      |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ✍     | LGTM  | (Look Good To Me) 내가 보기엔 괜찮아                                                                                                      |
| ✍     | SGTM  | (Sounds Good To Me) 나에게는 좋다. PR(Pull Request)를 날리면 Reviewer가 LGTM 대신 SGTM으로 작성하는 경우도 있다.                          |
| ✍     | IMO   | (In My Opinion) 내 생각에는, 개인적인 의견 입니다만.                                                                                      |
| ✍     | IMHO  | (In My Humble Opinion) 제 견해는... (IMO 보다 조금 더 격식있음)                                                                           |
| ✍     | FYI   | (For Your Information) 참고로                                                                                                             |
| ✍     | ASAP  | (As Soon As Possible) 가능한 빨리, 최대한 빠르게                                                                                          |
| ✍     | TL;DR | (Too Long; Didn't Read) 보통 문장 앞 부분에 긴 글을 요약할 때 쓰인다.                                                                     |
| ✍     | PTAL  | (Please Take Another Look) 제발 좀 봐주세요. 리뷰어가 리뷰를 해주다가 중간에 stop된 상태에서 리뷰좀 해달라고 부탁할때 쓰는 것으로 보인다. |
| ✍     | AFAIK | (As Far As I Know) 내가 알기에는, 내가 기억하는 한                                                                                        |

</div>
</details>
