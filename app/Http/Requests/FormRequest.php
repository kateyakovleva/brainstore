<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;

class FormRequest extends LaravelFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message' => 'required|string',
            'name' => 'string|required',
            'phone' => 'string|required',
            'email' => 'nullable|string',
        ];
    }
}
