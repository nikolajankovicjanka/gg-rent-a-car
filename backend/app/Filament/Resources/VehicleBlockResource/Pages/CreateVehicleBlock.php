<?php

namespace App\Filament\Resources\VehicleBlockResource\Pages;

use App\Filament\Resources\VehicleBlockResource;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use Filament\Resources\Pages\CreateRecord;

class CreateVehicleBlock extends CreateRecord
{
    protected static string $resource = VehicleBlockResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        app(AvailabilityService::class)->ensureFree(Vehicle::findOrFail($data['vehicle_id']), $data['start_date'], $data['end_date']);

        return $data;
    }
}
