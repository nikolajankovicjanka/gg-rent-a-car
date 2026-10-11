<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class VehicleImage extends Model
{
    protected $guarded = [];

    protected $appends = ['url'];

    protected $casts = ['is_primary' => 'boolean'];

    public function getUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->path);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
