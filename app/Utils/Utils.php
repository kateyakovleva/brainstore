<?php

namespace App\Utils;

class Utils
{
    public static function toArray($class)
    {
        return get_object_vars($class);
    }

    public static function imageUrl($link)
    {
        if (!$link) return '';
        return config('app.url') . '/storage/' . $link;
    }
}
