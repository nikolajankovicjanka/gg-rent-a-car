<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use App\Services\PricingService;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Vehicle::where('is_active', true)->with(['images', 'priceRules'])->orderByDesc('is_featured')->get()]);
    }

    public function show(Vehicle $vehicle)
    {
        abort_unless($vehicle->is_active, 404);

        return response()->json(['data' => $vehicle->load(['images', 'priceRules'])]);
    }

    public function availability(Request $request, Vehicle $vehicle, AvailabilityService $availability)
    {
        abort_unless($vehicle->is_active, 404);

        $d = $request->validate([
            'from' => 'nullable|required_with:to|date_format:Y-m-d',
            'to' => 'nullable|required_with:from|date_format:Y-m-d|after:from',
        ]);

        $from = $d['from'] ?? now()->toDateString();
        $to = $d['to'] ?? now()->addYear()->toDateString();

        return response()->json(['data' => $availability->busy($vehicle, $from, $to)]);
    }

    public function quote(Request $request, Vehicle $vehicle, PricingService $pricing, AvailabilityService $availability)
    {
        $d = $request->validate(['from' => 'required|date_format:Y-m-d', 'to' => 'required|date_format:Y-m-d|after:from']);
        $availability->ensureFree($vehicle, $d['from'], $d['to']);

        return response()->json(['data' => $pricing->quote($vehicle, $d['from'], $d['to'])]);
    }
}
