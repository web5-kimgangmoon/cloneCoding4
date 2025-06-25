sheme.prisma 설정.

```prisma
datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}
```

예시:
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"

mysql://USER:PASSWORD@HOST:PORT/DATABASE
