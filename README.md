# Next.js Markdown Blog

Markdown 콘텐츠를 사용하는 Next.js 블로그 연습 프로젝트입니다. 패키지 관리는 `pnpm@12.3.4`를 사용합니다.

## 로컬 실행

Node.js 24를 준비한 뒤 다음 명령을 실행합니다.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

이 프로젝트는 `package.json`의 `packageManager` 필드에 pnpm 버전을 고정합니다. 로컬에서 `pnpm` 명령을 바로 사용할 수 없다면 아래처럼 같은 버전을 명시해 실행할 수 있습니다.

```bash
npx --yes pnpm@12.3.4 install --frozen-lockfile
npx --yes pnpm@12.3.4 dev
```

프로덕션 빌드는 다음 명령으로 확인할 수 있습니다.

```bash
pnpm build
```

## Vercel 자동 배포

`.github/workflows/vercel-deploy.yml`은 `vercel` 브랜치에 push될 때만 실행됩니다. GitHub Actions는 의존성을 잠금 파일 그대로 설치한 후 Vercel CLI로 다음 작업을 수행합니다.

1. Vercel 프로젝트의 프로덕션 설정과 환경 변수를 가져옵니다.
2. GitHub Actions 실행 환경에서 프로덕션 빌드를 만듭니다.
3. 미리 빌드된 결과물을 Vercel 프로덕션 환경에 배포합니다.

워크플로에서는 실제 인증 값을 저장하지 않고 다음 GitHub Actions Secrets만 참조합니다.

| Secret | 용도 |
| --- | --- |
| `VERCEL_TOKEN` | Vercel CLI 인증 토큰 |
| `VERCEL_ORG_ID` | Vercel 계정 또는 팀 ID |
| `VERCEL_PROJECT_ID` | 배포할 Vercel 프로젝트 ID |

## 다음에 할 일

1. Vercel에서 이 저장소에 대응하는 프로젝트를 생성합니다.
2. 로컬에서 `pnpm exec vercel link`를 실행해 프로젝트를 연결합니다. 생성되는 `.vercel/project.json`에서 `orgId`와 `projectId`를 확인할 수 있으며, `.vercel/` 디렉터리는 Git에 커밋하지 않습니다.
3. Vercel 계정 설정에서 배포 권한이 있는 토큰을 생성합니다.
4. GitHub 저장소의 **Settings > Secrets and variables > Actions**에서 다음 Repository secrets를 등록합니다.
   - 토큰 값을 `VERCEL_TOKEN`으로 등록합니다.
   - `orgId` 값을 `VERCEL_ORG_ID`로 등록합니다.
   - `projectId` 값을 `VERCEL_PROJECT_ID`로 등록합니다.
5. 이 변경 사항을 검토하고 직접 커밋한 뒤 `vercel` 브랜치에 push합니다.
6. GitHub 저장소의 **Actions** 탭에서 `Deploy to Vercel` 워크플로가 성공했는지 확인합니다.

Vercel의 Git 연동에서도 같은 브랜치를 자동 배포하도록 설정하면 한 번의 push에 배포가 두 번 실행될 수 있습니다. 이 워크플로만 사용할 경우 Vercel 프로젝트의 Git 자동 배포 설정을 비활성화하거나 대상 브랜치에서 제외하세요.
