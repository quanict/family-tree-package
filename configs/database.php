<?php

return [
    'connections' => [
        'family-tree' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('ICT_PORT', '3306'),
            'username' => env('ICT_USERNAME', 'root'),
            'password' => env('ICT_PASSWORD', ''),
            'database' => env('ICT_DATABASE', 'family'),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => 'family_',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                \PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ]
    ]
];