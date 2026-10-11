<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleResource\Pages;
use App\Models\Vehicle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class VehicleResource extends Resource
{
    protected static ?string $model = Vehicle::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';

    protected static ?string $navigationLabel = 'Vozila';

    protected static ?string $modelLabel = 'Vozilo';

    protected static ?string $pluralModelLabel = 'Vozila';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Osnovni podaci')->schema([
                Forms\Components\TextInput::make('name')->label('Naziv')->required()->live(onBlur: true)->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', Str::slug($state))), Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true), Forms\Components\TextInput::make('type')->label('Tip')->default('Sedan')->required(), Forms\Components\TextInput::make('brand')->label('Marka')->required(), Forms\Components\TextInput::make('model')->required(), Forms\Components\TextInput::make('engine')->label('Motor'), Forms\Components\TextInput::make('year')->label('Godište')->numeric(), Forms\Components\TextInput::make('fuel')->label('Gorivo'), Forms\Components\TextInput::make('transmission')->label('Mjenjač'), Forms\Components\TextInput::make('seats')->label('Sjedišta')->numeric()->default(5), Forms\Components\TextInput::make('mileage')->label('Kilometraža')->numeric()->default(0), Forms\Components\Textarea::make('description')->label('Opis')->columnSpanFull()])->columns(2),
            Forms\Components\Section::make('Cijene i status')->schema([Forms\Components\TextInput::make('price_per_day')->label('KM / dan')->numeric()->required(), Forms\Components\Toggle::make('is_active')->label('Aktivno')->default(true), Forms\Components\Toggle::make('is_featured')->label('Istaknuto')])->columns(3),
            Forms\Components\Section::make('Popusti po broju dana')->schema([Forms\Components\Repeater::make('priceRules')->relationship()->schema([Forms\Components\TextInput::make('min_days')->label('Od dana')->numeric()->required(), Forms\Components\TextInput::make('max_days')->label('Do dana (prazno = bez limita)')->numeric(), Forms\Components\TextInput::make('discount_percent')->label('Popust %')->numeric()->minValue(0)->maxValue(100)->required()])->columns(3)->defaultItems(0)]),
            Forms\Components\Section::make('Fotografije')->schema([Forms\Components\Repeater::make('images')->relationship()->schema([Forms\Components\FileUpload::make('path')->label('Fotografija')->image()->disk('public')->directory('vehicles')->required(), Forms\Components\TextInput::make('alt')->label('Opis slike'), Forms\Components\Toggle::make('is_primary')->label('Glavna fotografija')])->orderColumn('sort_order')->collapsible()->defaultItems(0)]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([Tables\Columns\TextColumn::make('name')->label('Vozilo')->searchable()->sortable(), Tables\Columns\TextColumn::make('price_per_day')->label('KM / dan')->sortable(), Tables\Columns\IconColumn::make('is_active')->label('Aktivno')->boolean(), Tables\Columns\TextColumn::make('created_at')->dateTime('d.m.Y.')])->actions([Tables\Actions\EditAction::make()])->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListVehicles::route('/'), 'create' => Pages\CreateVehicle::route('/create'), 'edit' => Pages\EditVehicle::route('/{record}/edit')];
    }
}
