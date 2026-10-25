<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model {
    protected $guarded = [];
    public function student() { return $this->belongsTo(User::class, 'user_id'); }
}
