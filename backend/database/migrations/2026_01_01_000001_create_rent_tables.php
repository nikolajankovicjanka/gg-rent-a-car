<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('slug')->unique();
            $t->string('type')->default('Sedan');
            $t->string('brand');
            $t->string('model');
            $t->string('engine')->nullable();
            $t->unsignedSmallInteger('year')->nullable();
            $t->string('fuel')->nullable();
            $t->string('transmission')->nullable();
            $t->unsignedTinyInteger('seats')->default(5);
            $t->unsignedInteger('mileage')->default(0);
            $t->text('description')->nullable();
            $t->decimal('price_per_day', 10, 2);
            $t->boolean('is_active')->default(true);
            $t->boolean('is_featured')->default(false);
            $t->timestamps();
        });
        Schema::create('vehicle_images', function (Blueprint $t) {
            $t->id();
            $t->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $t->string('path');
            $t->string('alt')->nullable();
            $t->unsignedInteger('sort_order')->default(0);
            $t->boolean('is_primary')->default(false);
            $t->timestamps();
        });
        Schema::create('vehicle_price_rules', function (Blueprint $t) {
            $t->id();
            $t->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $t->unsignedInteger('min_days');
            $t->unsignedInteger('max_days')->nullable();
            $t->decimal('discount_percent', 5, 2)->default(0);
            $t->timestamps();
        });
        Schema::create('vehicle_blocks', function (Blueprint $t) {
            $t->id();
            $t->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $t->date('start_date');
            $t->date('end_date');
            $t->string('reason')->nullable();
            $t->timestamps();
            $t->index(['vehicle_id', 'start_date', 'end_date']);
        });
        Schema::create('bookings', function (Blueprint $t) {
            $t->id();
            $t->string('booking_number')->unique();
            $t->foreignId('vehicle_id')->constrained();
            $t->string('customer_name');
            $t->string('customer_email')->nullable();
            $t->string('customer_phone');
            $t->date('pickup_date');
            $t->date('return_date');
            $t->unsignedInteger('total_days');
            $t->decimal('price_per_day', 10, 2);
            $t->decimal('discount_percent', 5, 2)->default(0);
            $t->decimal('total_price', 10, 2);
            $t->string('status')->default('pending');
            $t->string('source')->default('web');
            $t->text('notes')->nullable();
            $t->timestamp('confirmed_at')->nullable();
            $t->timestamp('confirmation_email_sent_at')->nullable();
            $t->timestamps();
            $t->index(['vehicle_id', 'status', 'pickup_date', 'return_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('vehicle_blocks');
        Schema::dropIfExists('vehicle_price_rules');
        Schema::dropIfExists('vehicle_images');
        Schema::dropIfExists('vehicles');
    }
};
