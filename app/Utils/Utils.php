<?php

namespace App\Utils;

class Utils
{
    public static function toArray($class)
    {
        return get_object_vars($class);
    }
}
