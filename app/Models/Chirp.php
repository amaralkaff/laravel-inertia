<?php

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Chirp extends Model
{
    //
    protected $fillable = [
        'message',
    ];

    protected static function booted()
    {
        static::created(function ($chirp) {
            Log::info('Chirp created, dispatching event', ['chirp_id' => $chirp->id]);
        });
    }

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
