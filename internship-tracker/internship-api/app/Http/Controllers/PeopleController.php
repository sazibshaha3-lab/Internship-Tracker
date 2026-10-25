<?php
namespace App\Http\Controllers;

use App\Models\{User, Company, Alert};
use Illuminate\Http\Request;

class PeopleController extends Controller {
    public function students(Request $r) { return User::where('advisor_id', $r->user()->id)->get(['id', 'name', 'email', 'department']); }
    public function users(Request $r) { return User::with('advisor:id,name')->when($r->role, fn ($q, $v) => $q->where('role', $v))->orderBy('role')->get(); }
    public function createUser(Request $r) {
        $d = $r->validate(['name' => 'required', 'email' => 'required|email|unique:users', 'password' => 'required|min:8',
            'role' => 'required|in:student,advisor,recruiter,admin', 'company_id' => 'required_if:role,recruiter|nullable|exists:companies,id']);
        return response()->json(User::create($d), 201);
    }
    public function allocate(Request $r, User $user) {
        abort_unless($user->role === 'student', 422, 'Only students can be allocated.');
        $d = $r->validate(['advisor_id' => 'required|exists:users,id']);
        abort_unless(User::find($d['advisor_id'])->role === 'advisor', 422, 'Not an advisor.');
        $user->update($d);
        Alert::create(['user_id' => $user->id, 'title' => 'A career advisor was assigned to you']);
        return $user;
    }
    public function companies() { return Company::withCount('opportunities')->get(); }
    public function verify(Company $company) { $company->update(['verified' => !$company->verified]); return $company; }
}
