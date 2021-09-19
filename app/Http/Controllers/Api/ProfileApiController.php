<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePhotoRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileApiController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function uploadPhoto(UpdatePhotoRequest $request)
    {
        if ($path = $request->image->store('users/profile')) {
            $request->user()->update(['image' => $path]);

            return response()->json(['message' => 'success']);
        }

        return response()->json(['message' => 'fail'], 500);
    }

    public function update(Request $request)
    {
        $request->user()->update($request->all());

        return response()->json(['message' => 'success']);
    }

    public function uploadImageChat(UpdatePhotoRequest $request)
    {
        if ($path = $request->image->store('users/chat')) {
            $request->user()->update(['image_chat' => $path]);

            return response()->json(['message' => 'success']);
        }

        return response()->json(['message' => 'fail'], 500);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json(['message' => 'success']);
    }
}
