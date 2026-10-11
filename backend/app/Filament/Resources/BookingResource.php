<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use App\Services\BookingConfirmationService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationLabel = 'Rezervacije';

    protected static ?string $modelLabel = 'Rezervacija';

    protected static ?string $pluralModelLabel = 'Rezervacije';

    public static function form(Form $form): Form
    {
        return $form->schema([Forms\Components\Select::make('vehicle_id')->label('Vozilo')->relationship('vehicle', 'name')->required()->searchable(), Forms\Components\TextInput::make('customer_name')->label('Klijent')->required(), Forms\Components\TextInput::make('customer_phone')->label('Telefon')->required(), Forms\Components\TextInput::make('customer_email')->label('Email')->email(), Forms\Components\DatePicker::make('pickup_date')->label('Preuzimanje')->required(), Forms\Components\DatePicker::make('return_date')->label('Vraćanje')->required()->after('pickup_date'), Forms\Components\Select::make('source')->label('Izvor')->options(['web' => 'Web', 'phone' => 'Telefon', 'whatsapp' => 'WhatsApp', 'admin' => 'Admin'])->default('phone')->required(), Forms\Components\Textarea::make('notes')->label('Napomena')->columnSpanFull()])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([Tables\Columns\TextColumn::make('booking_number')->label('Broj')->searchable(), Tables\Columns\TextColumn::make('vehicle.name')->label('Vozilo'), Tables\Columns\TextColumn::make('customer_name')->label('Klijent')->searchable(), Tables\Columns\TextColumn::make('pickup_date')->label('Od'), Tables\Columns\TextColumn::make('return_date')->label('Do'), Tables\Columns\TextColumn::make('status')->badge()->colors(['warning' => 'pending', 'success' => 'confirmed', 'danger' => 'rejected', 'gray' => 'cancelled']), Tables\Columns\TextColumn::make('source')->label('Izvor')])->filters([Tables\Filters\SelectFilter::make('status')->options(['pending' => 'Na čekanju', 'confirmed' => 'Potvrđeno', 'rejected' => 'Odbijeno', 'cancelled' => 'Otkazano', 'completed' => 'Završeno'])])->actions([Tables\Actions\Action::make('confirm')->label('Potvrdi')->color('success')->requiresConfirmation()->visible(fn (Booking $record) => $record->status === 'pending')->action(fn (Booking $record) => app(BookingConfirmationService::class)->confirm($record)), Tables\Actions\Action::make('reject')->label('Odbij')->color('danger')->requiresConfirmation()->visible(fn (Booking $record) => $record->status === 'pending')->action(fn (Booking $record) => $record->update(['status' => 'rejected'])), Tables\Actions\Action::make('cancel')->label('Otkaži')->color('danger')->requiresConfirmation()->visible(fn (Booking $record) => $record->status === 'confirmed')->action(fn (Booking $record) => $record->update(['status' => 'cancelled'])), Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return ['index' => Pages\ListBookings::route('/'), 'create' => Pages\CreateBooking::route('/create'), 'edit' => Pages\EditBooking::route('/{record}/edit')];
    }
}
