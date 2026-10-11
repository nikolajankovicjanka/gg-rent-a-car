<?php

namespace App\Services;

use App\Jobs\SendBookingConfirmation;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;

class BookingConfirmationService
{
    public function confirm(Booking $booking): void
    {
        DB::transaction(function () use ($booking) {
            $booking = Booking::findOrFail($booking->id);
            app(AvailabilityService::class)->lockAndEnsureFree($booking->vehicle, $booking->pickup_date, $booking->return_date);
            $booking->update(['status' => 'confirmed', 'confirmed_at' => now()]);
        });
        if ($booking->customer_email) {
            SendBookingConfirmation::dispatch($booking->id)->afterCommit();
        }
    }
}
