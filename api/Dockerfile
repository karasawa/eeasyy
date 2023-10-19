FROM node:16-alpine
RUN apk update
RUN apk upgrade
WORKDIR /api
RUN npm i -g @nestjs/cli
RUN npm i class-transformer class-validator
RUN npm i prisma @prisma/client
RUN npm i @nestjs/passport passport @nestjs/jwt passport-jwt passport-local
RUN npm i --save-dev @types/passport-jwt @types/passport-local
RUN npm i bcrypt
RUN npm i -D @types/bcrypt