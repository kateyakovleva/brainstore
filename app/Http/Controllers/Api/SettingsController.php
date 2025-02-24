<?php

namespace App\Http\Controllers\Api;

use App\Models\Client;
use App\Models\HomeSlide;
use App\Models\Service;
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

        $settings['clients'] = Client::all()->toArray();
        $settings['services'] = Service::all()->toArray();
        $settings['home_slides'] = HomeSlide::all()->toArray();

        return response()->json($settings);
    }
}
