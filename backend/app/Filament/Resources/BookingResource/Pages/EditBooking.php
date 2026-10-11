<?php

namespace App\Filament\Resources\BookingResource\Pages;

use App\Filament\Resources\BookingResource;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use App\Services\PricingService;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Validation\ValidationException;

class EditBooking extends EditRecord
{
    protected static string $resource = BookingResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($this->record->status === 'confirmed') {
            throw ValidationException::withMessages(['pickup_date' => 'Potvrđenu rezervaciju prvo otkažite prije izmjene termina.']);
        }$v = Vehicle::findOrFail($data['vehicle_id']);
        app(AvailabilityService::class)->ensureFree($v, $data['pickup_date'], $data['return_date']);
        $q = app(PricingService::class)->quote($v, $data['pickup_date'], $data['return_date']);

        return [...$data, 'total_days' => $q['days'], 'price_per_day' => $q['price_per_day'], 'discount_percent' => $q['discount_percent'], 'total_price' => $q['total']];
    }
}
