<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Opportunity extends Model {
    protected $guarded = [];
    protected $casts = ['skills' => 'array', 'deadline' => 'date'];
    public function company() { return $this->belongsTo(Company::class); }
    public function applications() { return $this->hasMany(Application::class); }
}
