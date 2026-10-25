<?php
namespace App\Http\Controllers;

use App\Models\{Cv, Alert, Application};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller {
    public function index(Request $r) {
        $u = $r->user(); $q = Cv::with('student:id,name,email')->latest();
        if ($u->role === 'student') $q->where('user_id', $u->id);
        else $q->whereHas('student', fn ($w) => $w->where('advisor_id', $u->id));
        return $q->get();
    }
    public function store(Request $r) {
        $r->validate(['file' => 'required|file|mimes:pdf,doc,docx|max:4096']);
        $u = $r->user(); $f = $r->file('file');
        $v = Cv::where('user_id', $u->id)->max('version') + 1;
        $cv = Cv::create(['user_id' => $u->id, 'version' => $v, 'path' => $f->store('cvs'), 'original_name' => $f->getClientOriginalName()]);
        if ($u->advisor_id) Alert::create(['user_id' => $u->advisor_id, 'title' => 'New CV to review', 'body' => "{$u->name} uploaded CV v$v."]);
        return response()->json($cv, 201);
    }
    public function review(Request $r, Cv $cv) {
        abort_unless($cv->student->advisor_id === $r->user()->id, 403);
        $d = $r->validate(['status' => 'required|in:approved,changes_requested', 'feedback' => 'nullable|string']);
        $cv->update($d);
        Alert::create(['user_id' => $cv->user_id, 'title' => "CV v{$cv->version}: " . str_replace('_', ' ', $d['status'])]);
        return $cv;
    }
    public function download(Request $r, Cv $cv) {
        $u = $r->user();
        $ok = match ($u->role) {
            'student' => $cv->user_id === $u->id,
            'admin' => true,
            'advisor' => $cv->student->advisor_id === $u->id,
            'recruiter' => Application::forCompany($u->company_id)->where('cv_id', $cv->id)->exists(),
            default => false,
        };
        abort_unless($ok, 403);
        abort_unless(Storage::exists($cv->path), 404, 'File not found.');
        return Storage::download($cv->path, $cv->original_name ?? 'cv.pdf');
    }
}
