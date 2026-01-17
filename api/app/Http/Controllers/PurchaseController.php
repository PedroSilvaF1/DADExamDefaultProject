<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Product;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array',
            'cart.*' => 'exists:products,id',
        ]);

        $productIds = $validated['cart'];
        $total = 0;

        // Create the purchase record first
        $purchase = Purchase::create(['total' => 0]);

        // Fetch products to get prices
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        foreach ($productIds as $id) {
            if (isset($products[$id])) {
                $total += $products[$id]->price;
                $purchase->products()->attach($id);
            }
        }

        $purchase->update(['total' => $total]);

        return response()->json($purchase->load('products'), 201);
    }
}
