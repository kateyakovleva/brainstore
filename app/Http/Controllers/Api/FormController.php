<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\FormRequest;
use App\Mail\SendFormEmail;
use App\Models\Setting;
use Mail;

class FormController extends Controller
{
    public function form(FormRequest $request)
    {
        $email = Setting::findByCode('email')->value;

        Mail::to($email)
            ->send(new SendFormEmail($request));

        return response()->json();
    }
}
