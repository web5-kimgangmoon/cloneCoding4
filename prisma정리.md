# sheme.prisma 설정.

### prisma/schema.prisma 파일 기본설정.

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}
```

예시:
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"

mysql://USER:PASSWORD@HOST:PORT/DATABASE

### 마이그레이션

```bash
mkdir -p prisma/migrations/0_init

npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

- 설명:

  1. 처음에는 재귀적으로 파일생성.

- 설명:

  1. **npx prisma migrate diff**: 마이그레이션 비교 도구 실행
  2. **from-empty**: 빈 db 상태로 기준선 설정.
  3. **--to-schema-datamodel prisma/schema.prisma**: 비교 대상, 현재 prisma 데이터모델. 현재 디렉터리의 prisma/schema.prisma 파일과 비교한다.
  4. **--script**: sql 스크립트로 두 상태 간 차이를 출력.
  5. **> prisma/migration/0_init/migration.sql**: 결과를 지정된 경로에 저장

- prisma migrate diff는 두 스키마가 같아지도록 만들기 위한 SQL 명령어를 생성하는 도구입니다.

### prisma 생성

```bash
npx prisma generate
```

### main.ts 또는 index.ts(시작점)

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 프리즈마 클라이언트 쿼리들을 써야한다.
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

1. 프리즈마는 독자적인 프레임워크 흐름을 지니기 때문에, nest의 미들웨어에 추가하지 않고 nest의 콜백함수의 외부문맥에 객체를 생성하고 메서드체이닝을 활용해 연결과 연결종료를 제어한다.

### 기준선 설정 // 보류

```bash
npx prisma migrate resolve --applied 0_init
```

### migrate 관련 명령어

```bash
npx prisma migrate reset
npx prisma migrate dev
```
