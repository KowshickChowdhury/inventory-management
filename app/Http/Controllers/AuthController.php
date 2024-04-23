<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    
    public function register(Request $request)
    {
        $input = $request->all();
        $rules = [
            'name' => 'required|min:3|max:50',
            'email' => 'email|required|string|unique:users,email',
            'password' => 'min:8|same:password_confirmation',
            'password_confirmation' => 'min:8',
        ];

        $valid = Validator::make($request->all(), $rules);
        if ($valid->fails()) return $this->sendError($valid->errors());;

        $user =  $this->user->saveUser($input);

        // Auth::login($user);
        // $user->roles = $user->getRoleNames();
        // $input['device_name'] = $this->getDeviceName();
        return $this->sendResponse(['message' => 'Registration Completed', 'success' => true, 'data' => $user]);

        // return $this->sendResponse(['user' => $user, 'token' => $user->createToken($input['device_name'])->plainTextToken]);
    }
}
