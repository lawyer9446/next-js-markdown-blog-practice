# The Margin — Markdown blog

## GitHub Pages 배포

- 저장소: `lawyer9446/next-js-markdown-blog-practice`
- 소스 및 배포 트리거 브랜치: `deploy`
- 배포 주소: https://lawyer9446.github.io/next-js-markdown-blog-practice/
- 워크플로: `.github/workflows/deploy.yml`

저장소의 **Settings → Pages → Build and deployment → Source**에서
**GitHub Actions**를 선택합니다. `github-pages` 환경에 브랜치 제한이 설정되어
있다면 `deploy` 브랜치를 허용해야 합니다.

설정 후 `deploy` 브랜치에 push하면 의존성 설치, 정적 빌드, `out/` 아티팩트
업로드 및 GitHub Pages 배포가 자동으로 실행됩니다. 수동 실행 시에도 `deploy`
브랜치를 선택해야 합니다. 빌드 결과를 별도 브랜치에 commit하지 않습니다.

## 로컬 실행과 빌드

Node.js 24와 `package.json`에 지정된 pnpm 12.3.4를 사용합니다.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

개발 서버 주소: http://localhost:3000/next-js-markdown-blog-practice/

```bash
pnpm build
```

정적 결과는 `out/`에 생성됩니다. `output: 'export'`에서는 `next start`를
사용할 수 없습니다. 저장소 하위 경로까지 포함해 미리 보려면:

```bash
mkdir -p /tmp/markdown-blog-preview
ln -sfn "$PWD/out" /tmp/markdown-blog-preview/next-js-markdown-blog-practice
python3 -m http.server 3000 --directory /tmp/markdown-blog-preview
```

미리 보기 주소: http://localhost:3000/next-js-markdown-blog-practice/

빌드에는 npm 패키지 다운로드와 `next/font/google`의 폰트 다운로드를 위한
네트워크 연결이 필요합니다. `NEXT_PUBLIC_SITE_URL`로 메타데이터의 사이트
주소를 재정의할 수 있습니다. 끝의 슬래시는 생략해도 됩니다.

## 정적 호스팅 설정

`next.config.mjs`에서 정적 내보내기, 저장소 이름의 `basePath`,
`trailingSlash`, 이미지 최적화 비활성화를 설정합니다. 내부 `Link`에는
Next.js가 경로를 붙이며 이미지와 아이콘에는 `withBasePath`를 사용합니다.

글 목록은 빌드 시 Markdown 파일에서 읽고, 태그 필터와 페이지네이션은
브라우저에서 쿼리 문자열에 따라 처리합니다. 글 페이지, sitemap, robots는
정적으로 생성합니다. 필터 URL의 canonical은 홈으로 통합합니다.
GitHub Pages에서 지원하지 않는 서버 응답 헤더 설정은 제거했습니다.
