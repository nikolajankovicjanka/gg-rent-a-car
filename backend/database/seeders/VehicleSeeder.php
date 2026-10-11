<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $data = [['Škoda Octavia 2.0 TDI', 'skoda-octavia-2-0-tdi', 'Škoda', 'Octavia', '2.0 TDI', 150], ['Škoda Superb 2.0 TDI', 'skoda-superb-2-0-tdi', 'Škoda', 'Superb', '2.0 TDI', 190], ['Volkswagen Passat 2.0 TDI', 'vw-passat-2-0-tdi', 'Volkswagen', 'Passat', '2.0 TDI', 175]];
        foreach ($data as [$name,$slug,$brand,$model,$engine,$price]) {
            $v = Vehicle::firstOrCreate(['slug' => $slug], ['name' => $name, 'brand' => $brand, 'model' => $model, 'engine' => $engine, 'year' => 2023, 'fuel' => 'Dizel', 'transmission' => 'Automatik', 'seats' => 5, 'mileage' => 85000, 'description' => 'Udobno i pouzdano vozilo za svako putovanje.', 'price_per_day' => $price, 'is_active' => true, 'is_featured' => true]);
            $v->priceRules()->firstOrCreate(['min_days' => 11], ['max_days' => null, 'discount_percent' => 20]);
        }
    }
}
