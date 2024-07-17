# Telegram Notes Bot

## Інструкції по запуску

1. Клонуйте репозиторій:

  git clone [<repository-url>](https://github.com/RaDmunn/Notes_Bot_Telegram.git)

  cd telegram-notes-bot

2. Встановіть залежності:

  npm install

3. Налаштуйте змінні середовища:

  Створіть файл .env у кореневій директорії проекту.
  Додайте ваш Telegram Bot Token у файл .env:

  TELEGRAM_BOT_TOKEN=your-telegram-bot-token

4. Запустіть MongoDB сервер:

  mongod
  (За замовчуванням використовується mongodb://localhost/telegram-notes)

5. Запустіть проект:

  npm run start

6. Запустіть Telegram та знайдіть вашого бота, щоб почати використання.