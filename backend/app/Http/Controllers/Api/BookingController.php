<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use App\Services\PricingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request, AvailabilityService $availability, PricingService $pricing)
    {
        $d = $request->validated();
        $booking = DB::transaction(function () use ($d, $availability, $pricing) {
            $vehicle = Vehicle::whereKey($d['vehicle_id'])->where('is_active', true)->firstOrFail();
            $availability->lockAndEnsureFree($vehicle, $d['pickup_date'], $d['return_date']);
            $quote = $pricing->quote($vehicle, $d['pickup_date'], $d['return_date']);

            return Booking::create([...$d, ...['booking_number' => 'GG-'.now()->format('Y').'-'.strtoupper(Str::random(9)), 'total_days' => $quote['days'], 'price_per_day' => $quote['price_per_day'], 'discount_percent' => $quote['discount_percent'], 'total_price' => $quote['total'], 'status' => 'pending', 'source' => 'web']]);
        });

        return response()->json(['data' => ['booking_number' => $booking->booking_number, 'status' => $booking->status]], 201);
    }

    public function track(Request $request)
    {
        $d = $request->validate(['booking_number' => 'required|string|max:40', 'phone' => 'required|string|max:30']);
        $booking = Booking::with('vehicle:id,name')->where('booking_number', $d['booking_number'])->where('customer_phone', $d['phone'])->first();
        if (! $booking) {
            return response()->json(['message' => 'Rezervacija nije pronađena.'], 404);
        }

        return response()->json(['data' => $booking->only(['booking_number', 'pickup_date', 'return_date', 'total_days', 'total_price', 'status']) + ['vehicle' => $booking->vehicle]]);
    }
}
