<?php

use App\Http\Controllers\Api\ChatApiController;
use App\Http\Controllers\Api\FavoriteApiController;
use App\Http\Controllers\Api\ProfileApiController;
use App\Http\Controllers\Api\UserApiController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'ok'];
});

Route::prefix('v1')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('me', [ProfileApiController::class, 'me']);
        Route::post('logout', [ProfileApiController::class, 'logout']);

        Route::patch('profile/update-image-chat', [ProfileApiController::class, 'updatePreferenceImageChat']);
        Route::patch('profile/update-preference', [ProfileApiController::class, 'updatePreference']);
        Route::patch('profile/update-image', [ProfileApiController::class, 'uploadPhoto']);
        Route::patch('profile/update-image-chat', [ProfileApiController::class, 'updateImageChat']);
        Route::patch('profile/update', [ProfileApiController::class, 'update']);

        Route::get('users', [UserApiController::class, 'index']);

        Route::post('messages', [ChatApiController::class, 'store']);
        Route::patch('messages/mark_as_read/', [ChatApiController::class, 'markMessagesAsRead']);
        Route::get('messages/{id}', [ChatApiController::class, 'messagesWithUser']);

        Route::get('favorites', [FavoriteApiController::class, 'myFavorites']);
        Route::post('favorites', [FavoriteApiController::class, 'store']);
        Route::delete('favorites', [FavoriteApiController::class, 'destroy']);
    });
