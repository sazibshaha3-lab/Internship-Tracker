<?php
namespace App\Http\Controllers;

use App\Models\{Application, Cv, Alert};
use Illuminate\Http\Request;

class ApplicationController extends Controller {
    public function mine(Request $r) {
        return Application::with('opportunity.company:id,name', 'interview')->where('user_id', $r->user()->id)->latest()->get();
    }
    public function store(Request $r) {
        $d = $r->validate(['opportunity_id' => 'required|exists:opportunities,id', 'cover_note' => 'nullable|string|max:1000']);
        $u = $r->user();
        $cv = Cv::where('user_id', $u->id)->where('status', 'approved')->latest('version')->first();
        abort_unless($cv, 422, 'You need an advisor-approved CV before applying.');
        abort_if(Application::where('user_id', $u->id)->where('opportunity_id', $d['opportunity_id'])->exists(), 422, 'You already applied.');
        return response()->json(Application::create($d + ['user_id' => $u->id, 'cv_id' => $cv->id]), 201);
    }
    public function queue(Request $r) {
        return Application::with('user:id,name,email', 'opportunity.company:id,name', 'cv:id,version')
            ->when($r->review, fn ($q, $v) => $q->where('admin_review', $v))->latest()->get();
    }
    public function review(Request $r, Application $application) {
        $d = $r->validate(['decision' => 'required|in:approved,rejected']);
        $application->update(['admin_review' => $d['decision']] + ($d['decision'] === 'rejected' ? ['status' => 'Rejected'] : []));
        Alert::create(['user_id' => $application->user_id, 'title' => "Application {$d['decision']} by admin review"]);
        return $application;
    }
    public function forward(Application $application) {
        abort_unless($application->admin_review === 'approved', 422, 'Approve the application first.');
        $application->update(['forwarded_at' => now()]);
        Alert::create(['user_id' => $application->user_id, 'title' => 'Your application was forwarded to the company']);
        return $application;
    }
    public function candidates(Request $r) {
        return Application::forCompany($r->user()->company_id)
            ->with('user:id,name,email,department,skills', 'opportunity:id,title,company_id', 'cv:id,version', 'interview')->latest()->get();
    }
    public function setStatus(Request $r, Application $application) {
        $d = $r->validate(['status' => 'required|in:Shortlisted,Interview,Offer,Rejected']);
        abort_unless(Application::forCompany($r->user()->company_id)->whereKey($application->id)->exists(), 403);
        $application->update($d);
        Alert::create(['user_id' => $application->user_id, 'title' => "Your application moved to {$d['status']}"]);
        return $application;
    }
}
