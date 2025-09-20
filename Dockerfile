FROM php:8.1-fpm
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
    libpq-dev git unzip libzip-dev zip && \
    docker-php-ext-install pdo pdo_pgsql
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . /var/www/html
RUN composer install --no-dev --optimize-autoloader || true
