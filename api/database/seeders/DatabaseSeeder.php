<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Product::create(['name' => 'Portátil Gaming', 'price' => 1200.50, 'description' => 'Super rápido']);
        Product::create(['name' => 'Rato Wireless', 'price' => 25.00, 'description' => 'Sem fios']);
        Product::create(['name' => 'Monitor 24"', 'price' => 150.00, 'description' => 'Full HD']);
    }
}
