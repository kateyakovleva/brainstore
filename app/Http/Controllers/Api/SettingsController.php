<?php

namespace App\Http\Controllers\Api;

use App\Models\Setting;

class SettingsController extends Controller
{
    public function get()
    {
        $settings = [];
        foreach (Setting::all() as $setting) {
            /** @var Setting $setting */
            $settings[$setting->key] = $setting->value;
        }

        return response()->json($settings);
    }
}
