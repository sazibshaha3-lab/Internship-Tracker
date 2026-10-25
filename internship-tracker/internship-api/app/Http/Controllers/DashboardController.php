<?php
namespace App\Http\Controllers;

use App\Models\{Application, Cv, Interview, User, Company, Alert};
use Illuminate\Http\Request;

class DashboardController extends Controller {
    public function show(Request $r) {
        $u = $r->user();
        $data = match ($u->role) {
            'student' => $this->student($u), 'advisor' => $this->advisor($u),
            'admin' => $this->admin(), 'recruiter' => $this->recruiter($u),
        };
        $data['alerts'] = Alert::where('user_id', $u->id)->latest()->limit(6)->get();
        return $data;
    }
    private function student($u) {
        $pipeline = Application::where('user_id', $u->id)->selectRaw('status, count(*) as c')->groupBy('status')->pluck('c', 'status');
        $cv = Cv::where('user_id', $u->id)->latest('version')->first();
        $upcoming = Interview::with('application.opportunity.company:id,name')
            ->whereHas('application', fn ($q) => $q->where('user_id', $u->id))
            ->where('scheduled_at', '>=', now())->orderBy('scheduled_at')->first();
        return ['stats' => [
            ['label' => 'Active Applications', 'value' => $pipeline->except('Rejected')->sum()],
            ['label' => 'Interviews', 'value' => $pipeline['Interview'] ?? 0],
            ['label' => 'Offers', 'value' => $pipeline['Offer'] ?? 0],
            ['label' => 'Latest CV', 'value' => $cv ? str_replace('_', ' ', $cv->status) : 'none'],
        ], 'pipeline' => $pipeline, 'upcoming' => $upcoming];
    }
    private function advisor($u) {
        return ['stats' => [
            ['label' => 'Assigned Students', 'value' => User::where('advisor_id', $u->id)->count()],
            ['label' => 'CVs Awaiting Review', 'value' => Cv::where('status', 'pending')->whereHas('student', fn ($q) => $q->where('advisor_id', $u->id))->count()],
        ]];
    }
    private function admin() {
        return ['stats' => [
            ['label' => 'Students', 'value' => User::where('role', 'student')->count()],
            ['label' => 'Pending Reviews', 'value' => Application::where('admin_review', 'pending')->count()],
            ['label' => 'Verified Companies', 'value' => Company::where('verified', true)->count()],
            ['label' => 'Offers', 'value' => Application::where('status', 'Offer')->count()],
        ]];
    }
    private function recruiter($u) {
        $c = fn () => Application::forCompany($u->company_id);
        return ['stats' => [
            ['label' => 'Candidates', 'value' => $c()->count()],
            ['label' => 'Interviews', 'value' => $c()->where('status', 'Interview')->count()],
            ['label' => 'Offers', 'value' => $c()->where('status', 'Offer')->count()],
        ]];
    }
}
