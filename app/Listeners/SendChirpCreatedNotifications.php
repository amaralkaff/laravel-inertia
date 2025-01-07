<?php

namespace App\Listeners;

use App\Events\ChirpCreated;
use App\Models\User;
use App\Notifications\NewChirp;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendChirpCreatedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ChirpCreated $event): void
    {
        Log::info('SendChirpCreatedNotifications: Starting to process notification');
        
        foreach (User::whereNot('id', $event->chirp->user_id)->cursor() as $user) {
            Log::info('Sending notification to user: ' . $user->id);
            $user->notify(new NewChirp($event->chirp));
        }
        
        Log::info('SendChirpCreatedNotifications: Finished processing notification');
    }
}
