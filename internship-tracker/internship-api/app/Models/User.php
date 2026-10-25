<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;
    protected $guarded = [];
    protected $hidden = ['password', 'remember_token'];
    protected function casts(): array { return ['password' => 'hashed', 'skills' => 'array']; }
    public function advisor() { return $this->belongsTo(User::class, 'advisor_id'); }
}
