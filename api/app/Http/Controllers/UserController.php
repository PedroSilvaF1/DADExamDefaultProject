<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function password(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:3|confirmed',
        ]);

        $user = $request->user();

        if (!password_verify($request->input('current_password'), $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }
}
