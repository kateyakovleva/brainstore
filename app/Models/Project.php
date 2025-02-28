<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $short_description
 * @property string|null $background
 * @property string|null $image
 * @property array|null $tags
 * @property array|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $seo_alias
 * @property-read mixed $blocks
 * @property-read mixed $image_url
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @mixin \Eloquent
 */
class Project extends Model
{
    use HasFactory;

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
        'blocks',
        'image_url'
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

    public function getImageUrlAttribute()
    {
        if (!$this->image) return '';
        return config('app.url') . '/storage/' . $this->image;
    }
}
