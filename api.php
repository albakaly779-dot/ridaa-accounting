<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JournalEntryController;

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/journal-entries', [JournalEntryController::class, 'store']);
    Route::get('/journal-entries', [JournalEntryController::class, 'index']);
});
