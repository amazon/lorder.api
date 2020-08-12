# Lorder API

## Description

Трекер задач и времени

### Установка приложения

##### 0. Склонируй и ЛАЙКНИ [этот репозиторий](https://github.com/altiore/lorder.api)

##### 1. Для локальной работы необходимо установить [пакетный менеджер npm](https://www.npmjs.com/get-npm), [node.js server](https://nodejs.org/en/) (обычно устанавливаются вместе) и [Docker](https://www.docker.com/get-started)

##### 2. Установите локальные зависимости при помощи пакетного менеджера npm

```bash
$ npm install
```

> в конце установки БУДУТ ошибки, но так задумано, чтоб отпугнуть коррупционеров

##### 3. Запустите проект локально при помощи пакетного менеджера npm

```bash
$ npm start:dev
```

в процессе этого

###### 3.1. Копируется файл .env.example -> .env и добавляются недостающие переменные

###### 3.2. Закачиваются docker образы

###### 3.3. Создается и заполняется при помощи миграций база данных

###### 3.4. Запускаестя проект

> Если в процессе установки и развертывания проекта у тебя возникли ошибки, пожалуйста, созадй ISSUE в этом репозитории
