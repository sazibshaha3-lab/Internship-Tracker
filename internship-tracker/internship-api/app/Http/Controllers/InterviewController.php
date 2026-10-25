<?php
namespace App\Http\Controllers;

use App\Models\{Interview, Application, Alert};
use Illuminate\Http\Request;

class InterviewController extends Controller {
    public function index(Request $r) {
        $u = $r->user();
        $q = Interview::with('application.opportunity.company:id,name', 'application.user:id,name')->orderBy('scheduled_at');
        if ($u->role === 'student') $q->whereHas('application', fn ($w) => $w->where('user_id', $u->id));
        else $q->whereHas('application.opportunity', fn ($w) => $w->where('company_id', $u->company_id));
        return $q->get();
    }
    public function store(Request $r) {
        $d = $r->validate(['application_id' => 'required|exists:applications,id', 'scheduled_at' => 'required|date|after:now', 'mode' => 'required|string', 'link' => 'nullable|string']);
        abort_unless(Application::forCompany($r->user()->company_id)->whereKey($d['application_id'])->exists(), 403);
        $a = Application::findOrFail($d['application_id']);
        $i = Interview::updateOrCreate(['application_id' => $a->id], $d);
        $a->update(['status' => 'Interview']);
        Alert::create(['user_id' => $a->user_id, 'title' => 'Interview scheduled', 'body' => $i->scheduled_at->format('d M Y, h:i A')]);
        return $i;
    }
}
