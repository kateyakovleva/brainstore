<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $key
 * @property array $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $type
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @mixin \Eloquent
 */
class Setting extends Model
{
    use HasFactory;

    protected $casts = [
        'value' => 'json'
    ];

    protected $guarded = [];

    public static function findByCode(string $code)
    {
        return static::where('key', $code)->first();
    }

    public static function getByCode(string $code)
    {
        return static::where('key', $code)->first()?->value;
    }

    public static function set(string $code, mixed $value)
    {
        $item = static::findByCode($code);
        $item->update(['value' => $value]);
    }
}
