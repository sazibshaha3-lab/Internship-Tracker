<?php
namespace Database\Seeders;

use App\Models\{User, Company, Opportunity, Cv};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $co = Company::create(['name' => 'TechNova Solutions', 'verified' => true]);
        Company::create(['name' => 'Unverified Co', 'verified' => false]);
        $pw = 'password123';
        User::create(['name' => 'Admin', 'email' => 'admin@demo.test', 'password' => $pw, 'role' => 'admin']);
        $adv = User::create(['name' => 'Advisor', 'email' => 'advisor@demo.test', 'password' => $pw, 'role' => 'advisor']);
        User::create(['name' => 'Recruiter', 'email' => 'recruiter@demo.test', 'password' => $pw, 'role' => 'recruiter', 'company_id' => $co->id]);
        $st = User::create(['name' => 'Student', 'email' => 'student@demo.test', 'password' => $pw, 'role' => 'student', 'advisor_id' => $adv->id, 'department' => 'CSE']);
        Cv::create(['user_id' => $st->id, 'version' => 1, 'path' => 'cvs/demo.pdf', 'original_name' => 'demo.pdf', 'status' => 'approved']);
        foreach ([['Frontend Developer Intern', 'Internship', 'Dhaka'], ['Backend Developer Intern', 'Internship', 'Remote'],
                  ['Junior QA Engineer', 'Job', 'Rajshahi'], ['Data Analysis Training', 'Training', 'Dhaka']] as [$t, $type, $loc]) {
            Opportunity::create(['company_id' => $co->id, 'title' => $t, 'type' => $type, 'location' => $loc,
                'description' => "$t at TechNova Solutions.", 'skills' => ['React', 'Laravel'], 'deadline' => now()->addDays(20)]);
        }
    }
}
