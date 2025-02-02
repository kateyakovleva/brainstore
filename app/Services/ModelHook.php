<?php

namespace App\Services;

use Barryvdh\LaravelIdeHelper\Console\ModelsCommand;
use Barryvdh\LaravelIdeHelper\Contracts\ModelHookInterface;
use Illuminate\Database\Eloquent\Model;

class ModelHook implements ModelHookInterface
{
    public function run(ModelsCommand $command, Model $model): void
    {

    }
}
