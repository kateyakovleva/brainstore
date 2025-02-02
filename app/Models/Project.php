<?php

namespace App\Models;

use App\Traits\HasFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property string $name
 * @property string|null $short_description
 * @property string|null $background
 * @property mixed|null $image
 * @property array|null $tags
 * @property mixed|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @mixin \Eloquent
 */
class Project extends Model
{
    use HasFactory, HasFile;

    protected $_files = [
        'image' => 'projects',
        'description.image' => 'projects'
    ];

    protected $guarded = [];

    protected $attributes = [
        'tags' => '[]',
        'description' => '[]'
    ];

    protected $casts = [
        'tags' => 'array',
        'description' => 'array'
    ];

    protected $appends = [
        'blocks'
    ];

    public function getBlocksAttribute()
    {
        return \Arr::map($this->description, function ($el) {
            $d = $el['data'] ?? [];
            if (isset($d['image'])) {
                $d['image'] = config('app.url') . '/storage/' . $d['image'];
            }
            return $d;
        });
    }
}
