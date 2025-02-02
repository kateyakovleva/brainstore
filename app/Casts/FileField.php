<?php

namespace App\Casts;

use Arr;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Storage;

class FileField implements CastsAttributes
{
    protected static $cache = [];
    protected static $castCache = [];

    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        $x = static::class . "-$key-$model->id";
        if (isset(self::$castCache[$x])) {
            return self::$castCache[$x];
        }
        if (!$value) return '';
        if ($model->hasFileInDTO($key)) {
            $fileKeys = array_flip($model->getFileKeys());
            $keyPath = explode('.', Arr::first($fileKeys, fn($k) => Str::startsWith($k, "$key.")));
            $value = json_decode($value, true);
            $subKey = $keyPath[1] ?? null;
            if ($subKey) {
                if (isset($value[$subKey])) {
                    $value[$subKey] = $this->makeFileName($value[$subKey]);
                } else if (is_array($value[0] ?? null)) {
                    foreach ($value as $k => $v) {
                        if(!isset($v[$subKey])) continue;
                        $value[$k][$subKey] = $this->makeFileName($v[$subKey]);
                    }
                }
            }

            self::$castCache[$x] = $value;
            return $value;
        }

        return $this->makeFileName($value);
    }

    public function makeFileName($value): string
    {
        if (Str::startsWith($value, 'http')) {
            return $value;
        }
        try {
            return $this->getHttpPrefix() . $value;
        } catch (\Exception $e) {
            return '';
        }
    }

    public function getHttpPrefix()
    {
        return config('app.url') . '/storage/';
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($model->hasFileInDTO($key)) {
            $fileKeys = array_flip($model->getFileKeys());
            $keyPath = explode('.', Arr::first($fileKeys, fn($k) => Str::startsWith($k, "$key.")));
            $subKey = $keyPath[1] ?? null;
            if ($subKey) {
                if (isset($value[$subKey])) {
                    if ($value[$subKey] instanceof UploadedFile) {
                        $value[$subKey] = $this->setFile($model, $key, $value[$subKey]);
                    } else {
                        $value[$subKey] = Str::replace($this->getHttpPrefix(), '', $value[$subKey]);
                    }
                } else if (is_array($value[0] ?? null)) {
                    foreach ($value as $k => $v) {
                        if(!isset($v[$subKey])) continue;
                        if ($v[$subKey] instanceof UploadedFile) {
                            $value[$k][$subKey] = $this->setFile($model, $key, $v[$subKey]);
                        } else {
                            $value[$k][$subKey] = Str::replace($this->getHttpPrefix(), '', $v[$subKey]);
                        }
                    }
                }
            }

            return json_encode($value);
        }

        return $this->setFile($model, $key, $value);
    }

    public function setFile(Model $model, $key, $value)
    {
        if ($value instanceof UploadedFile) {
            $k = $model::class . ":" . $value->getClientOriginalName();
            if (isset(self::$cache[$k])) return self::$cache[$k];

            $model->deleteFile($key);
            $filename = Str::random(10) . "." . $value->extension();
            $folder = $this->getFileFolder($model, $key);
            Storage::putFileAs($folder, $value, $filename);
            $value = "$folder/$filename";
            self::$cache[$k] = $value;
        }

        return $value;
    }

    public function getFileFolder(Model $model, $key)
    {
        foreach ($model->getFileKeys() as $k => $folder) {
            $k = explode('.', $k);
            if (in_array($key, $k) && !str_contains($folder, '{')) {
                return $folder;
            } else {
                $paths = explode('/', $folder);
                $path[] = $paths[0];
                foreach ($paths as $i => $p) {
                    if (!$i) continue;
                    if (str_contains($p, '{')) {
                        $var = trim($p, '{}');
                        $path[] = $model->$var ?? $var;
                    } else {
                        $path[] = $p;
                    }
                }

                return implode('/', $path);
            }
        }
        return '';
    }
}
