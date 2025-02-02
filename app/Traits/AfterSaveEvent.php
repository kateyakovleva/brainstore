<?php

namespace App\Traits;

use Closure;
use DB;

trait AfterSaveEvent
{
    public static function bootAfterSaveEvent()
    {
        static::saved(function ($model) {
            foreach ($model->getAfterListeners() as $code => $listener) {
                $model->callAndRemoveListener($code, $listener);
            }
        });
    }

    protected $afterSaveListeners = [];

    public function getAfterListeners()
    {
        return $this->afterSaveListeners;
    }

    public function removeAfterListener($code)
    {
        unset($this->afterSaveListeners[$code]);
    }

    public function executeAfterSaving(string $code, Closure $callback)
    {
        if ($this->exists) {
            $this->callAndRemoveListener($code, $callback);
        } else {
            $this->afterSaveListeners[$code] = $callback;
        }
    }

    public function callAndRemoveListener(string $code, Closure $listener)
    {
        DB::transaction(function () use ($code, $listener) {
            $listener();
            $this->removeAfterListener($code);
        });
    }
}
