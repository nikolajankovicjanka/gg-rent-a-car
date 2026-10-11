<?php

namespace App\Services;

use App\Models\Vehicle;
use Carbon\CarbonImmutable;
use Illuminate\Validation\ValidationException;

class PricingService
{
    public function quote(Vehicle $vehicle, string $start, string $end): array
    {
        $days = (int) CarbonImmutable::parse($start)->diffInDays(CarbonImmutable::parse($end), false);
        if ($days < 1) {
            throw ValidationException::withMessages(['return_date' => 'Datum vraćanja mora biti poslije preuzimanja.']);
        }$rule = $vehicle->priceRules()->where('min_days', '<=', $days)->where(fn ($q) => $q->whereNull('max_days')->orWhere('max_days', '>=', $days))->orderByDesc('min_days')->first();
        $discount = (float) ($rule?->discount_percent ?? 0);
        $price = (float) $vehicle->price_per_day;

        return ['days' => $days, 'price_per_day' => $price, 'discount_percent' => $discount, 'daily_discounted' => round($price * (1 - $discount / 100), 2), 'total' => round($days * $price * (1 - $discount / 100), 2)];
    }
}
