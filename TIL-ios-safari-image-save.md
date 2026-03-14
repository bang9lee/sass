# TIL: iOS Safari 저장 이미지에 업로드 사진 누락 문제 해결

## 문제
- 얼굴형 결과 페이지에서 "저장" 시 아이폰 사파리에서만 저장 이미지에 업로드 사진이 빠지고 HUD(선/텍스트)만 남음.

## 원인
- `html-to-image`는 DOM을 SVG `<foreignObject>`로 변환한 뒤 캔버스로 렌더링한다.
- iOS Safari(WebKit)에서 `<foreignObject>` 기반 캡처는 `<img>`가 누락되거나 빈 캔버스로 나오는 이슈가 반복적으로 보고됨.

## 해결 전략
- iOS에서만 DOM 캡처 경로를 우회한다.
- 사진은 캔버스에 직접 그린다.
- 오버레이(선/텍스트)는 `html-to-image`로 캡처해 합성한다.
- 캡처 순간 배경이 사진을 덮지 않도록 카드 배경을 투명화 후 복구한다.
- 이미지 패널의 라운드 코너를 캔버스에서도 동일하게 클립한다.

## 구현 요약
- 위치: `src/components/FaceShapeResultCardClient.tsx`
- 핵심 변경점:
  1) iOS에서 `html-to-image` 캡처 시 얼굴 `<img>`는 제외(`filter`).
  2) 사진은 `drawImage`로 직접 렌더링 (DOM 이미지 → `createImageBitmap` → `Image.decode` 순서로 안전하게 로딩).
  3) 캡처 직전 카드/이미지 패널 배경을 투명 처리 후 복구.
  4) 이미지 패널의 `border-radius`를 읽어 캔버스에서 동일하게 클리핑.

## 저장 파이프라인(요약 흐름)
1. iOS 여부 확인
2. 오버레이 캡처 준비(배경 투명화)
3. `html-to-image`로 오버레이 캡처
4. 캔버스에 배경 → 사진 → 오버레이 순으로 합성
5. PNG 저장

## 검증 방법
- iPhone 14 Safari에서 저장 버튼 클릭
- 저장된 이미지에 얼굴 사진 포함 여부 확인
- 라운드 코너와 오버레이 정합 확인

## 주의사항
- iOS Safari는 DOM 캡처가 불안정하므로, iOS에서는 “직접 캔버스 합성”을 기본 전략으로 유지하는 것이 안정적이다.
- 외부 이미지 URL을 쓰는 경우 CORS에 의해 캔버스가 taint될 수 있으니 가능하면 dataURL 유지.
