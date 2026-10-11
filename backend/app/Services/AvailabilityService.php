<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AvailabilityService
{
    public function busy(Vehicle $vehicle, string $from, string $to): array
    {
        $bookings = $vehicle->bookings()->where('status', 'confirmed')->where('pickup_date', '<', $to)->where('return_date', '>', $from)->get(['pickup_date', 'return_date'])->map(fn ($b) => ['start' => $b->pickup_date, 'end' => $b->return_date, 'type' => 'booking']);
        $blocks = $vehicle->blocks()->where('start_date', '<', $to)->where('end_date', '>', $from)->get(['start_date', 'end_date'])->map(fn ($b) => ['start' => $b->start_date, 'end' => $b->end_date, 'type' => 'blocked']);

        return $bookings->concat($blocks)->sortBy('start')->values()->all();
    }

    public function ensureFree(Vehicle $v, string $start, string $end): void
    {
        if ($v->bookings()->where('status', 'confirmed')->where('pickup_date', '<', $end)->where('return_date', '>', $start)->exists() || $v->blocks()->where('start_date', '<', $end)->where('end_date', '>', $start)->exists()) {
            throw ValidationException::withMessages(['pickup_date' => 'Termin nije dostupan za odabrano vozilo.']);
        }
    }

    public function lockAndEnsureFree(Vehicle $v, string $start, string $end): void
    {
        DB::table('vehicles')->where('id', $v->id)->lockForUpdate()->first();
        $this->ensureFree($v, $start, $end);
    }
}
