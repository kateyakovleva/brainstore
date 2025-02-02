<?php

namespace App\Traits;

use App\Casts\FileField;
use Storage;

trait HasFile
{
    public static function bootHasFile()
    {
        static::deleted(function ($model) {
            foreach ($model->getFileKeys() as $key => $folder) {
                $model->deleteFile($key);
            }
        });
    }

    protected $hasFileKeys = [];

    public function initializeHasFile()
    {
        $files = [];
        foreach ($this->getFileKeys() as $key => $folder) {
            if (is_int($key)) {
                $files[$folder] = '';
            } else {
                $files[$key] = $folder;
            }
        }
        $this->_files = $files;
        foreach ($this->getFileKeys() as $key => $folder) {
            $keys = explode('.', $key);
            $key = $keys[0];
            $this->hasFileKeys[$key] = count($keys) > 1;
            $this->casts[$key] = FileField::class;
        }
    }

    public function hasFile($key): bool
    {
        return isset($this->hasFileKeys[$key]);
    }

    public function hasFileInDTO($key): bool
    {
        return isset($this->hasFileKeys[$key]) && $this->hasFileKeys[$key];
    }

    public function deleteFile($key): void
    {
        $keys = explode('.', $key);
        $key = $keys[0];
        $subKey = $keys[1] ?? null;
        $data = $this->attributes[$key] ?? '';
        if (is_array($data) && $subKey) {
            foreach ($data as $obj) {
                $image = $obj[$subKey] ?? '';
                if ($image && Storage::exists($image)) {
                    Storage::delete($image);
                }
            }
        }
    }

    public function getFileKeys()
    {
        if (!property_exists($this, '_files')) {
            throw new \Exception('Пожалуйста заполните массив _files значениями attribute => folder_name');
        }

        return $this->_files;
    }
}
