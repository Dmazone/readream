# ReaDream — Google Play 스토어 등록 가이드

신원 확인 완료 이메일이 오면 아래 순서대로 진행하세요.

---

## 폴더 내 파일 목록

| 파일 | 용도 | 크기 요건 |
|------|------|-----------|
| `icon-512.svg` | 앱 아이콘 | 512×512 PNG 변환 필요 |
| `feature-graphic.svg` | 스토어 대표 이미지 | 1024×500 PNG 변환 필요 |
| `screenshots/screenshot-01.png` | 스크린샷 1 (메인) | ✅ 완료 |
| `screenshots/screenshot-02.png` | 스크린샷 2 (해몽 결과) | ✅ 완료 |
| `screenshots/screenshot-03.png` | 스크린샷 3 (해석 스크롤) | ✅ 완료 |
| `store-listing.txt` | 앱 이름·설명 텍스트 | ✅ 복붙 가능 |
| `privacy-policy.html` | 개인정보처리방침 | GitHub Pages 업로드 필요 |

---

## SVG → PNG 변환 방법

`icon-512.svg`와 `feature-graphic.svg`는 SVG 파일이므로 PNG로 변환해야 합니다.

**간단한 방법**: 브라우저에서 SVG 파일 열기 → 우클릭 → 다른 이름으로 저장 (PNG)
또는 https://svgtopng.com 에서 업로드 변환

---

## 개인정보처리방침 배포

`privacy-policy.html`을 GitHub Pages에 올려야 합니다.

```
파일 위치: readream 레포지토리 루트에 privacy-policy.html 추가
접근 URL: https://dmazone.github.io/readream/privacy-policy.html
```

---

## Google Play Console 등록 순서

1. **앱 만들기** → 앱 이름: `ReaDream - AI 꿈 해몽`
2. **스토어 등록정보** → `store-listing.txt` 내용 붙여넣기
3. **그래픽 자료 업로드**
   - 앱 아이콘: `icon-512.png` (512×512)
   - 피처 그래픽: `feature-graphic.png` (1024×500)
   - 스크린샷: `screenshot-01~03.png` 3장
4. **개인정보처리방침 URL** 입력:
   `https://dmazone.github.io/readream/privacy-policy.html`
5. **앱 콘텐츠** → 콘텐츠 등급 설정 (전체 이용가)
6. **출시** → 프로덕션 트랙 → 검토 제출

---

## 앱 유형: TWA (Trusted Web Activity)

ReaDream은 웹앱이므로 네이티브 APK 대신 **TWA** 방식으로 등록합니다.
신원 확인 완료 후 Claude Code에게 "TWA APK 빌드해줘" 라고 말씀해주세요.
