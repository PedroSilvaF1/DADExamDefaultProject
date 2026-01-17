<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('filter')) {
            $filter = $request->input('filter');
            return Product::where('name', 'like', '%' . $filter . '%')->get();
        }
        return Product::all();
    }

    public function updateName(string $id, Request $request)
    {
        $product = Product::find($id);

        $product->name = $request->input('name', $product->name);
        $product->save();
    }
}
