<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
Route::get('/vehicles/{vehicle}/availability', [VehicleController::class, 'availability']);
Route::get('/vehicles/{vehicle}/quote', [VehicleController::class, 'quote']);
Route::post('/bookings', [BookingController::class, 'store'])->middleware('throttle:10,1');
Route::post('/bookings/track', [BookingController::class, 'track'])->middleware('throttle:10,1');
