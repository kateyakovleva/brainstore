<?php

namespace App\Utils;

class TypeHelper
{
    protected static $types = ['array' => true, 'boolean' => true, 'decimal' => true, 'integer' => true, 'numeric' => true, 'file' => true];

    public static function isPrimitive(string $value): bool
    {
        return isset(self::$types[$value]);
    }

    public static function toSwaggerType(string $type): string
    {
        return match ($type) {
            'array' => 'array',
            'boolean' => 'boolean',
            'decimal', 'numeric' => 'number',
            'integer' => 'integer',
            'file' => 'file',
        };
    }
}
