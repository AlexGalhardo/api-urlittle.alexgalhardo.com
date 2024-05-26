<div align="center">
  <h1 align="center"><a href="https://api-urlittle.alexgalhardo.com" target="_blank">api-urlittle.alexgalhardo.com</a></h1>
</div>

## Development Setup Local

1. Clone repository
```
git clone git@github.com:AlexGalhardo/api-urlittle.alexgalhardo.com.git
```

2. Enter repository
```
cd git@github.com:AlexGalhardo/api-urlittle.alexgalhardo.com.git
```

3. Run setup.sh
```
chmod +x setup.sh && ./setup.sh
```

4. To open prisma studio
```
bun prisma studio
```

## JSON Databases
- If you wanna use JSON database, set in your `.env` file:
```
USE_JSON_DATABASE=true
```
- If false, default database is PostgreSQL


## Single file binary
a. Creating build
```
bun run build
```

b. Executing single file binary
```
./server
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) June 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
