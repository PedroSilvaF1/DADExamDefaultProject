<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    // 1. Listar apenas as notas do utilizador logado
    public function index()
    {
        // Auth::user()->id pega no ID de quem fez o pedido
        return Note::where('user_id', Auth::user()->id)->get();
    }

    // 2. Guardar uma nova nota
    public function store(Request $request)
    {
        // Validação básica
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        // Criar a nota associada ao utilizador
        $note = Note::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => Auth::user()->id
        ]);

        return response()->json($note, 201);
    }
}
