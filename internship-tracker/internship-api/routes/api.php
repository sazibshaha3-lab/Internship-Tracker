<?php
use App\Http\Controllers\{AuthController, DashboardController, OpportunityController, ApplicationController, CvController, InterviewController, NoteController, PeopleController};
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'show']);
    Route::get('/opportunities', [OpportunityController::class, 'index']);
    Route::post('/opportunities', [OpportunityController::class, 'store'])->middleware('role:recruiter,admin');
    Route::get('/cvs/{cv}/download', [CvController::class, 'download']);
    Route::get('/interviews', [InterviewController::class, 'index'])->middleware('role:student,recruiter');

    Route::middleware('role:student')->group(function () {
        Route::get('/applications', [ApplicationController::class, 'mine']);
        Route::post('/applications', [ApplicationController::class, 'store']);
        Route::post('/cvs', [CvController::class, 'store']);
    });
    Route::middleware('role:student,advisor')->group(function () {
        Route::get('/cvs', [CvController::class, 'index']);
        Route::get('/notes', [NoteController::class, 'index']);
        Route::post('/notes', [NoteController::class, 'store']);
    });
    Route::middleware('role:advisor')->group(function () {
        Route::get('/students', [PeopleController::class, 'students']);
        Route::patch('/cvs/{cv}/review', [CvController::class, 'review']);
    });
    Route::middleware('role:admin')->group(function () {
        Route::get('/queue', [ApplicationController::class, 'queue']);
        Route::patch('/applications/{application}/review', [ApplicationController::class, 'review']);
        Route::patch('/applications/{application}/forward', [ApplicationController::class, 'forward']);
        Route::get('/users', [PeopleController::class, 'users']);
        Route::post('/users', [PeopleController::class, 'createUser']);
        Route::patch('/users/{user}/advisor', [PeopleController::class, 'allocate']);
        Route::get('/companies', [PeopleController::class, 'companies']);
        Route::patch('/companies/{company}/verify', [PeopleController::class, 'verify']);
    });
    Route::middleware('role:recruiter')->group(function () {
        Route::get('/candidates', [ApplicationController::class, 'candidates']);
        Route::patch('/applications/{application}/status', [ApplicationController::class, 'setStatus']);
        Route::post('/interviews', [InterviewController::class, 'store']);
    });
});
