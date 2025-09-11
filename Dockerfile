FROM alpine AS build

WORKDIR /app

RUN apk add nodejs npm

COPY package.json .

RUN npm install

COPY . .

RUN npx drizzle-kit push --force
RUN npm run build

FROM alpine

WORKDIR /root

RUN apk add nodejs

COPY --from=build /app/*.db .
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build"]
