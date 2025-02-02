<?php

namespace App\Utils;

use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Collection;

class DTO implements Jsonable, \JsonSerializable
{
    public function __construct($attributes = [])
    {
        foreach ($attributes as $key => $value) {
            if ($value instanceof Collection) {
                $value = $value->toArray();
            }
            $this->$key = $value;
        }
    }

    public function toArray()
    {
        return Utils::toArray($this);
    }

    public function toJson($options = 0)
    {
        return json_encode($this->jsonSerialize(), $options | JSON_THROW_ON_ERROR);
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
