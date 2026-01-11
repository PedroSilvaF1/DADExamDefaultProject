<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;


Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});

Route::get('/users/total', function () {
    $totalUsers = User::count();
    return response()->json(['total' => $totalUsers], 200);
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/me', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [AuthController::class, 'logout']);
});
