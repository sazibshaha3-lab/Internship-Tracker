<?php
namespace App\Http\Controllers;

use App\Models\{Note, User};
use Illuminate\Http\Request;

class NoteController extends Controller {
    public function index(Request $r) {
        $u = $r->user();
        if ($u->role === 'student') return Note::where('student_id', $u->id)->where('private', false)->latest()->get();
        $sid = $r->query('student_id');
        abort_unless(User::where('id', $sid)->where('advisor_id', $u->id)->exists(), 403);
        return Note::where('student_id', $sid)->latest()->get();
    }
    public function store(Request $r) {
        $d = $r->validate(['body' => 'required|string|max:2000', 'student_id' => 'nullable|exists:users,id']);
        $u = $r->user();
        if ($u->role === 'student') { $sid = $u->id; $private = false; }
        else { $sid = $d['student_id'] ?? null; abort_unless($sid && User::find($sid)->advisor_id === $u->id, 403); $private = true; }
        return response()->json(Note::create(['user_id' => $u->id, 'student_id' => $sid, 'body' => $d['body'], 'private' => $private]), 201);
    }
}
