<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    protected $guarded = [];

    protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean', 'price_per_day' => 'decimal:2'];

    public function images(): HasMany
    {
        return $this->hasMany(VehicleImage::class)->orderBy('sort_order');
    }

    public function priceRules(): HasMany
    {
        return $this->hasMany(VehiclePriceRule::class)->orderBy('min_days');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(VehicleBlock::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
