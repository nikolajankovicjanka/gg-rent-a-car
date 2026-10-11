<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleBlockResource\Pages;
use App\Models\VehicleBlock;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VehicleBlockResource extends Resource
{
    protected static ?string $model = VehicleBlock::class;

    protected static ?string $navigationIcon = 'heroicon-o-lock-closed';

    protected static ?string $navigationLabel = 'Blokirani termini';

    public static function form(Form $form): Form
    {
        return $form->schema([Forms\Components\Select::make('vehicle_id')->relationship('vehicle', 'name')->required(), Forms\Components\DatePicker::make('start_date')->required(), Forms\Components\DatePicker::make('end_date')->after('start_date')->required(), Forms\Components\TextInput::make('reason')->label('Razlog')]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([Tables\Columns\TextColumn::make('vehicle.name')->label('Vozilo'), Tables\Columns\TextColumn::make('start_date')->label('Od'), Tables\Columns\TextColumn::make('end_date')->label('Do'), Tables\Columns\TextColumn::make('reason')->label('Razlog')])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListVehicleBlocks::route('/'), 'create' => Pages\CreateVehicleBlock::route('/create'), 'edit' => Pages\EditVehicleBlock::route('/{record}/edit')];
    }
}
