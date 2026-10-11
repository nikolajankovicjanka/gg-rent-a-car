<?php

namespace App\Filament\Resources\VehicleBlockResource\Pages;

use App\Filament\Resources\VehicleBlockResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListVehicleBlocks extends ListRecords
{
    protected static string $resource = VehicleBlockResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
