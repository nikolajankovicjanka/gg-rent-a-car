<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['vehicle_id' => 'required|integer|exists:vehicles,id', 'customer_name' => 'required|string|max:150', 'customer_email' => 'required|email|max:150', 'customer_phone' => 'required|string|max:30', 'pickup_date' => 'required|date_format:Y-m-d|after_or_equal:today', 'return_date' => 'required|date_format:Y-m-d|after:pickup_date', 'notes' => 'nullable|string|max:2000'];
    }
}
