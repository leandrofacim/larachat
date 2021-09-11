<?php

use App\Http\Controllers\Api\ChatApiController;
use App\Http\Controllers\Api\FavoriteApiController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'ok'];
});

Route::prefix('v1')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('users', [UserApiController::class, 'index']);

        Route::post('messages', [ChatApiController::class, 'store']);
        Route::patch('messages/mark_as_read/', [ChatApiController::class, 'markMessagesAsRead']);
        Route::get('messages/{id}', [ChatApiController::class, 'messagesWithUser']);

        Route::get('favorites', [FavoriteApiController::class, 'myFavorites']);
        Route::post('favorites', [FavoriteApiController::class, 'store']);
        Route::delete('favorites', [FavoriteApiController::class, 'destroy']);
    });
