<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        // Listar tickets do utilizador autenticado
        return Tickets::where('user_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $ticket = Tickets::create([
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'status' => 'open',
            'user_id' => $request->user()->id,
        ]);

        return response()->json($ticket, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:open,closed',
        ]);

        $ticket = Tickets::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $ticket->status = $validated['status'];
        $ticket->save();

        return response()->json($ticket);
    }
}
