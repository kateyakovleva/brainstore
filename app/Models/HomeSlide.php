<?php

namespace App\Models;

use App\Utils\Utils;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string|null $image
 * @property string|null $video
 * @property string|null $description
 * @property bool $show_logo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $link
 * @property int|null $apply_blur
 * @property int|null $time
 * @property-read mixed $image_url
 * @property-read mixed $video_url
 * @method static \Illuminate\Database\Eloquent\Builder|HomeSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HomeSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HomeSlide query()
 * @mixin \Eloquent
 */
class HomeSlide extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $attributes = [
        'show_logo' => false,
    ];

    protected $appends = [
        'image_url',
        'video_url',
    ];

    protected $casts = [
        'show_logo' => 'boolean'
    ];

    public function getImageUrlAttribute()
    {
        return Utils::resourceUrl($this->image);
    }

    public function getVideoUrlAttribute()
    {
        return Utils::resourceUrl($this->video);
    }
}
