<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $guarded = [];

    protected $casts = ['confirmed_at' => 'datetime', 'confirmation_email_sent_at' => 'datetime'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
