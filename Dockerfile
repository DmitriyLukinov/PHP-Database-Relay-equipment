FROM node:latest AS build

# Задаем рабочий каталог
WORKDIR /var/www/html

# Копируем код приложения
COPY . /var/www/html

# Устанавливаем зависимости проекта
RUN --mount=type=cache,target=/root/.npm npm install 
RUN npm run build

#####################################################3333
# Используем отдельный этап для PHP-приложения
FROM php:8.2-cli

# Устанавливаем зависимости
RUN apt-get update && \
    apt-get install -y \
    libzip-dev \
    zip

# Устанавливаем PHP-расширения
RUN docker-php-ext-install pdo_mysql zip

# Задаем рабочий каталог
WORKDIR /var/www/html

# Копируем код приложения из предыдущего этапа
COPY --from=build /var/www/html /var/www/html

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Монтируем локальный кэш для Composer
RUN --mount=type=cache,target=/root/.composer composer install

EXPOSE 81

CMD ["php", "-S", "0.0.0.0:81", "-t", "public"]