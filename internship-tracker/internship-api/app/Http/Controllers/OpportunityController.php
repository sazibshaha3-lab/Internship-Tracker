<?php
namespace App\Http\Controllers;

use App\Models\{Opportunity, Company};
use Illuminate\Http\Request;

class OpportunityController extends Controller {
    public function index(Request $r) {
        $uid = $r->user()->id;
        return Opportunity::with('company:id,name')
            ->withExists(['applications as applied' => fn ($q) => $q->where('user_id', $uid)])
            ->where('status', 'open')
            ->when($r->q, fn ($q, $v) => $q->where(fn ($w) => $w->where('title', 'like', "%$v%")->orWhere('location', 'like', "%$v%")))
            ->when($r->type, fn ($q, $v) => $q->where('type', $v))
            ->latest()->get();
    }
    public function store(Request $r) {
        $u = $r->user();
        $d = $r->validate(['title' => 'required', 'type' => 'required|in:Internship,Job,Training', 'location' => 'required',
            'description' => 'required', 'deadline' => 'nullable|date', 'skills' => 'array', 'company_id' => 'nullable|exists:companies,id']);
        if ($u->role === 'recruiter') $d['company_id'] = $u->company_id;
        abort_unless(!empty($d['company_id']) && Company::find($d['company_id'])->verified, 403, 'Company is not verified yet.');
        return response()->json(Opportunity::create($d), 201);
    }
}
