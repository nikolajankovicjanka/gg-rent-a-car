<?php

namespace App\Filament\Resources\BookingResource\Pages;

use App\Filament\Resources\BookingResource;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use App\Services\BookingConfirmationService;
use App\Services\PricingService;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateBooking extends CreateRecord
{
    protected static string $resource = BookingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $v = Vehicle::findOrFail($data['vehicle_id']);
        app(AvailabilityService::class)->ensureFree($v, $data['pickup_date'], $data['return_date']);
        $quote = app(PricingService::class)->quote($v, $data['pickup_date'], $data['return_date']);

        return [...$data, ...['booking_number' => 'GG-'.now()->format('Y').'-'.strtoupper(Str::random(9)), 'total_days' => $quote['days'], 'price_per_day' => $quote['price_per_day'], 'discount_percent' => $quote['discount_percent'], 'total_price' => $quote['total'], 'status' => 'pending']];
    }

    protected function afterCreate(): void
    {
        app(BookingConfirmationService::class)->confirm($this->record);
    }
}
