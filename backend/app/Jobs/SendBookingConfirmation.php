<?php

namespace App\Jobs;

use App\Mail\BookingConfirmed;
use App\Models\Booking;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendBookingConfirmation implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $bookingId) {}

    public function handle(): void
    {
        $b = Booking::with('vehicle')->find($this->bookingId);
        if (! $b || $b->status !== 'confirmed' || ! $b->customer_email || $b->confirmation_email_sent_at) {
            return;
        }Mail::to($b->customer_email)->send(new BookingConfirmed($b));
        $b->forceFill(['confirmation_email_sent_at' => now()])->save();
    }
}
